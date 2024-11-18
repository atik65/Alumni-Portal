"use client";
import { Suspense, useState } from "react";
import logo from "/public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaAngleDown, FaAngleRight, FaBars } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import dynamic from "next/dynamic";
// import SearchBar from "./SearchBar";
import { signOut } from "next-auth/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SearchBar = dynamic(() => import("./SearchBar"), {
  ssr: false,
});
// const MobileMenu = dynamic(() => import("./MobileMenu"), {
//   ssr: false,
// });

import MobileMenu from "./MobileMenu";
import { PiSignOutBold } from "react-icons/pi";

export const headerData = [
  {
    id: 1,
    title: "Home",
    href: "/",

    // children: [
    //   {
    //     id: 100,
    //     title: "Adelaide Airport Transfer",
    //     href: "/adelaide-airport-transfer",
    //   },
    //   {
    //     id: 101,
    //     title: "Avalon Airport Transfer",
    //     href: "/avalon-airport-transfers",
    //   },
    //   {
    //     id: 102,
    //     title: "Brisbane Airport Transfer",
    //     href: "/brisbane-airport-transfers",
    //   },
    //   {
    //     id: 103,
    //     title: "Canberra Airport Transfer",
    //     href: "/canberra-airport-transfer",
    //   },
    //   {
    //     id: 104,
    //     title: "Gold Coast Airport Transfer",
    //     href: "/gold-coast-airport-transfer",
    //   },
    //   {
    //     id: 105,
    //     title: "Hobart Airport Transfer",
    //     href: "/hobart-airport-transfer",
    //   },
    //   {
    //     id: 106,
    //     title: "Melbourne Airport Transfer",
    //     href: "/luxury-airport-transfers-chauffeur-in-melbourne",
    //   },
    //   {
    //     id: 107,
    //     title: "Perth Airport Transfer",
    //     href: "/perth-airport-transfer",
    //   },
    //   {
    //     id: 108,
    //     title: "Sydney Airport Transfer",
    //     href: "/sydney-airport-transfer",
    //   },
    // ],
  },
  {
    id: 100,
    title: "News",
    href: "/",
  },
  {
    id: 101,
    title: "Events",
    href: "/",
  },
  {
    id: 102,
    title: "Alumni",
    href: "/",
  },

  {
    id: 2,
    title: "Jobs",
    href: "/",
  },
  {
    id: 200,
    title: "Donation",
    href: "/",
  },

  // {
  //   id: 4,
  //   title: "Blog",
  //   href: "/category/blog",
  // },

  // {
  //   id: 5,
  //   title: "Our Fleets",
  //   href: "/our-fleets",
  // },
];

const Header = () => {
  // const pathname = usePathname();

  const { data: session, status } = useSession();

  // const [isScrolled, setIsScrolled] = useState(false);

  const [subMenuId, setSubMenuId] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowSearchBar = (status) => {
    setShowSearchBar(status);
  };

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleSubMenu = (id) => {
    setSubMenuId(id);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const isTop = scrollPosition < 116;

  //     setIsScrolled(!isTop);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // console.log("showSearchBar", showSearchBar);

  // if (pathname === "/booking") return null;
  // console.log("session ==> ", session);

  return (
    // <div
    //   onClick={() => handleShowSearchBar(false)}
    //   className={`flex bg-black justify-between w-full px-5 items-center h-[116px] border-b border-[#8D8787] transition-all duration-300 ease-linear z-50  ${
    //     isScrolled
    //       ? "sticky top-0 z-50 shadow-md  border-none"
    //       : "sticky -top-20 "
    //   }`}
    // >

    <div
      onClick={() => handleShowSearchBar(false)}
      className={
        "flex bg-white text-black justify-between w-full px-5 items-center h-[100px] border-b border-[#8D8787] transition-all duration-300 ease-linear z-50 sticky top-0 shadow-md"
      }

      // className={
      //   "flex bg-white text-black justify-between  px-5 items-center h-[100px] border-b border-[#8D8787] transition-all duration-300 ease-linear  sticky shadow-md"
      // }
    >
      <div className="">
        <Link href="/">
          {/* <Image className="w-[85px]" src={logo} alt="logo" /> */}
          <Image
            className="w-[60px] lg:w-[80px] 2xl:w-[100px]"
            src={logo}
            alt="MNMRiDEZ Chauffeur"
          />
          {/* <h1 className="font-bold text-lg">LOGO</h1> */}
        </Link>
      </div>
      <div className="hidden w-full lg:flex   lg:gap-5 xl:gap-10  justify-center gap-5">
        {headerData.map((item) => (
          <div className="relative " key={item.id}>
            <Link
              onMouseEnter={() => handleSubMenu(item.id)}
              onMouseLeave={() => handleSubMenu(null)}
              href={item?.href}
              style={{
                fontWeight: "bold",
              }}
              className="text-black font-bold  py-5  flex gap-2 items-center text-sm xl:text-base"
            >
              <span>{item.title}</span> {item.children && <FaAngleDown />}
            </Link>

            {subMenuId === item.id && (
              <div
                id="subMenuContainer"
                className={` transition-all duration-300 ease-in-out
   
                ${
                  subMenuId === item.id
                    ? "translate-y-0 opacity-100 "
                    : "translate-y-2 opacity-0"
                }`}
              >
                {item.children && (
                  <div
                    onMouseEnter={() => handleSubMenu(item.id)}
                    onMouseLeave={() => handleSubMenu(null)}
                    style={{
                      width: "max-content",
                    }}
                    className={`absolute top-0 left-0 w-full   pt-2  border-t-2 border-[#C2CE3B]    bg-white
                
                  
                
                  `}
                  >
                    {item.children.map((child) => (
                      <Link
                        href={child.href}
                        className="block  font-medium px-3 py-2 border-b border-gray-600 hover:bg-[#C2CE3B] hover:text-black"
                        key={child.id}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-auto flex gap-4 xl:gap-8 items-center">
        <button
          title="Search Blogs"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleShowSearchBar(true);
          }}
        >
          <IoSearch className="font-bold text-lg cursor-pointer" />
        </button>

        {status === "unauthenticated" && (
          <Link href="/login" className="hidden md:block w-12  font-medium">
            Log in
          </Link>
        )}

        {status === "authenticated" && (
          <Link
            href={"/profile"}
            className=" px-2 text-3xl text-black font-medium"
          >
            <AiOutlineUser />
          </Link>
        )}

        {/* signout */}
        {status === "authenticated" && (
          <button
            onClick={() => signOut()}
            className=" px-2 text-3xl text-black font-medium"
          >
            <PiSignOutBold />
          </button>
        )}

        <Link
          href={"/portal"}
          className=" hidden sm:flex items-center justify-center bg-gradient-to-r
           hover:bg-gradient-to-l from-[#2A2470] to-[#2A2470] w-[150px]  h-[48px] text-white font-bold"
        >
          <span>Portal</span>
          <FaAngleRight />
        </Link>

        {/* <button
          title="Open Menu"
          onClick={handleMobileMenu}
          className="flex lg:hidden items-center justify-center bg-gradient-to-r from-[#C2CE3B] to-[#60BA08] px-3 text-2xl  h-[48px] text-black font-bold"
        >
          <FaBars />
        </button> */}

        <Sheet>
          <SheetTrigger asChild>
            <button
              title="Open Menu"
              onClick={handleMobileMenu}
              className="flex lg:hidden items-center justify-center bg-gradient-to-r from-[#2A2470] to-[#2A2470] px-3 text-2xl  h-[48px] text-white font-bold"
            >
              <FaBars />
            </button>
          </SheetTrigger>

          {/* {mobileMenu && ( */}
          <SheetContent side="left" className="w-full sm:w-[450px]">
            <MobileMenu
              mobileMenu={mobileMenu}
              handleMobileMenu={handleMobileMenu}
            />
          </SheetContent>
          {/* )} */}

          {/* 
          <SheetContent side="left" className="w-full sm:w-[450px]">
            <MobileMenu
              mobileMenu={mobileMenu}
              handleMobileMenu={handleMobileMenu}
            />
          </SheetContent> */}
        </Sheet>
      </div>

      {/* {mobileMenu && (
        <MobileMenu
          mobileMenu={mobileMenu}
          handleMobileMenu={handleMobileMenu}
        />
      )} */}

      {showSearchBar && (
        <SearchBar
          showSearchBar={showSearchBar}
          handleShowSearchBar={handleShowSearchBar}
        />
      )}
    </div>
  );
};

export default Header;
