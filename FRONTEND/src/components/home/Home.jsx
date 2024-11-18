import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";

const Home = () => {
  return (
    <div className="h-[60vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Coming Soon
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Alumni Portal of University of Asia Pacific (UAP)
      </p>
    </div>
  );
};

export default Home;
