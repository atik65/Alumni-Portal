export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/portal/:path*",
    "/profile",
    "/dashboard/:path*",
    // "/settings/:path*",
    // "/account/:path*",
    // "/plan/:path*",
    // "/payment/:path*",
    // "/board/:path*",
    // "/change-password/:path*",
  ],
};
