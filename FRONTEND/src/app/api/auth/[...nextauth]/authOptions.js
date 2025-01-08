import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

/**
 * Takes a token and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    //refresh token API URL
    const url = `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/token/refresh/`;
    const response = await axios.post(url, { refresh: token.refreshToken });
    const refreshedTokens = response.data;

    if (response.status === 200) {
      return {
        ...token,
        accessToken: refreshedTokens.access,
        // accessTokenExpires: Date.now() + 1 * 1000,
        refreshToken: refreshedTokens.refresh || token.refreshToken,
      };
    } else {
      throw refreshedTokens;
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    // error: "/auth-error",
    error: "/login",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
            {
              email: email,
              password: password,
              confirm_password: password,
            }
          );
          // console.log("res from auth handler :>> ", res.data);

          const user = res.data;

          if (user) {
            return user?.data;
          }

          // return null;
        } catch (err) {
          // console.log("err in log in :>> ", err?.response?.data);
          console.log("err in log in :>> ", err?.response?.data?.error);
          throw new Error(err?.response?.data?.error || "Login failed");
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn(data) {
      const { user, account, credentials, profile } = data;

      console.log("data from sign in callback :>> ", data);

      if (account.provider === "credentials") {
        console.log("user from credentials callback :>> ", user);
        return user;
      }

      // you can verify additional verifications here
      if (account.provider === "google") {
        // console.log("profile from google :>> ", profile);
        return profile.email_verified;
        // return profile.email_verified && profile.email.endsWith("@uap-bd.edu");
        // now i can only log in with uap mail only
      }

      return true;
    },

    async jwt(data) {
      let { token, user, account } = data;

      // console.log("account from jwt callback :>> ", account);
      // console.log("token from jwt callback :>> ", token);
      // console.log("user from jwt callback :>> ", user);

      // console.log("data from jwt callback :>> ", data);

      // Handle credentials provider
      if (account?.provider === "credentials") {
        return {
          accessToken: user?.access,
          refreshToken: user?.refresh,
          user, // Storing user data for session callback
        };
      }

      // Handle Google provider
      if (account?.provider === "google") {
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          provider: "google",
        };
      }

      // Handle token refresh for credentials
      if (token?.refreshToken) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session(data) {
      let { session, token, user, account } = data;

      // console.log("session from session callback :>> ", token);
      // console.log("data from session callback :>> ", data);
      // Add accessToken and provider info to the session
      session.user = token.user || session.user; // Ensure user data is available
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.provider = token.provider || "credentials"; // Default to credentials
      return session;
    },
  },
};
