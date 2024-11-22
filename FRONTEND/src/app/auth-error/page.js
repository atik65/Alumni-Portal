"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Error = ({ error }) => {
  const params = useSearchParams();

  console.log("error = ", error);

  console.log("params = ", params.get("error"));
  return (
    <div className="flex items-center justify-center h-screen">
      {params.get("error") == "AccessDenied" && (
        <h1 className="text-xl font-bold">Access Denied</h1>
      )}
    </div>
  );
};

export default Error;
