"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { IoClose } from "react-icons/io5";
import logo from "/public/assets/logo.png";
import Link from "next/link";
import { headerData } from "./Header";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";

const MobileMenu = ({ mobileMenu, handleMobileMenu }) => {
  const [subMenuId, setSubMenuId] = useState(null);
  const { data: session } = useSession();

  const handleSubMenu = (id) => {
    if (subMenuId === id) {
      setSubMenuId(null);
    } else {
      setSubMenuId(id);
    }
  };

  return (
    <div
      // style={{
      //   zIndex: 1000,
      //   overflowX: "hidden",
      // }}
      // className={` ${
      //   mobileMenu ? "fixed" : "hidden"
      // } left-0 right-0 top-0 bottom-0 bg-white text-black h-[100vh] overflow-scroll w-[100vw] `}

      className={` bg-white text-black   `}
    >
      <div className="px-5 mb-7  flex justify-between relative">
        <div className="">
          <Link href="/">
            <h1 className="text-xl font-bold">LOGO </h1>
          </Link>
        </div>

        {/* <button onClick={handleMobileMenu} className=" text-3xl text-black">
          <IoClose />
        </button> */}
      </div>

      {/* header menu show */}

      {headerData.map((item) => (
        <div key={item.id} className="text-black font-bold    px-5">
          <div className="flex gap-2 justify-between items-center">
            <Link
              onClick={handleMobileMenu}
              className="w-full py-2"
              href={item?.href}
            >
              <span>{item.title}</span>
            </Link>
            {item.children && (
              <button className="px-5  " onClick={() => handleSubMenu(item.id)}>
                {<FaAngleDown />}
              </button>
            )}
          </div>

          {item.children && (
            <div
              className={` ${
                subMenuId == item.id
                  ? "h-[360px]"
                  : "h-0 opacity-0 overflow-hidden"
              }  bg-white text-black w-full duration-200`}
            >
              {item.children.map((child) => (
                <Link
                  onClick={handleMobileMenu}
                  key={child.id}
                  href={child.href}
                  className="py-2 px-5 block font-medium"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* log in and sign out */}

      {!session?.user?.user?.id && (
        <Link
          onClick={handleMobileMenu}
          href={"/login"}
          className="flex gap-3 items-center px-5 text-base text-black font-semibold"
        >
          <span>Login</span>
        </Link>
      )}

      {session?.user?.user?.id && (
        <Link
          onClick={handleMobileMenu}
          href={"/profile"}
          className="flex gap-3 items-center px-5 text-base text-black font-semibold"
        >
          <AiOutlineUser /> <span>Profile</span>
        </Link>
      )}

      {session?.user?.user?.id && (
        <button
          // onClick={signOut}
          onClick={() => {
            handleMobileMenu();
            signOut();
          }}
          className="flex gap-3 items-center px-5 text-base text-black font-semibold mt-2"
        >
          <PiSignOutBold /> <span>Sign Out</span>
        </button>
      )}

      <div className=" mt-5">
        <Link
          href={"/booking"}
          className=" flex w-full items-center justify-center bg-gradient-to-r from-[#C2CE3B] to-[#60BA08]   py-5 text-black font-bold"
        >
          <span>Book Now</span>
          <FaAngleRight />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
