"use client";

import { useSession } from "next-auth/react";
import React from "react";

const ProfileContainer = () => {
  const { data: session } = useSession();

  console.log("session = ", session);
  // {
  //     "user": {
  //         "name": "Md. Atikul Islam Atik",
  //         "email": "21201063@uap-bd.edu",
  //         "image": "https://lh3.googleusercontent.com/a/ACg8ocJSOqmFzgTyGqSQsiPyfTcwvvrp6LPjQ6t9B2PM6dws0FxXANk=s96-c"
  //     },
  //     "expires": "2024-12-18T19:58:02.224Z",
  //     "accessToken": "ya29.a0AeDClZCiPvg8U8NgIH3noh_bXHOOo6I2rx8C7N0-9BLdmwwvfKiJODsnmvB66qByWId6ZkgCdxeCr5AQzFMfWFTzK2gYdHzbgcYU7gkiwIiAAsx4lWfI-Pf21fuz-ST7dYRZjAdtIL_CQkh_EPVwtWPuoPk-bI6ZANg9cr7eaCgYKAdwSARESFQHGX2MickK2S_SKh0gnBFIFQl0n1A0175",
  //     "provider": "google"
  // }

  return (
    <div className="container mx-auto min-h-[60vh] flex items-center">
      {/* preview user info */}

      <div className="mt-10 w-full">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-32 h-32 rounded-full"
            src={session?.user?.image}
            alt="Profile"
          />
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
