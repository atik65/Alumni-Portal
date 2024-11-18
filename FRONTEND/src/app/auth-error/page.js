"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const error = ({ error }) => {
  const params = useSearchParams();

  console.log("params = ", params.get("error"));
  return (
    <div className="flex items-center justify-center h-screen">
      {params.get("error") == "AccessDenied" && (
        <h1 className="text-xl font-bold">Access Denied</h1>
      )}
    </div>
  );
};

export default error;
