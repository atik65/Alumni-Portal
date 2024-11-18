"use client";
// import carLogo from "/public/assets/logoCar.png";
import carLogo from "/public/assets/mnm_logo.webp";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaRegEnvelope,
  FaXTwitter,
} from "react-icons/fa6";

import { IoHomeOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import paymentMethodLogo from "/public/assets/paymentMethods.png";
import logo from "../../../public/assets/logo.png";
const Footer = () => {
  // if (pathname === "/booking") return null;

  return (
    <div className="px-5 sm:px-10 py-5  grid grid-cols-1 md:grid-cols-2  gap-8 bg-white text-black">
      <div>
        {/* logo and social icons */}
        <div className="h-full flex flex-col gap-5 justify-between">
          <Image
            src={logo}
            className="w-28"
            height={100}
            width={144}
            alt="MNMRiDEZ Chauffeur"
          />

          {/* <h1 className="text-xl font-bold">LOGO</h1> */}

          {/* about */}
          <div>
            <div className=" flex flex-col gap-3">
              {/* <Link href="/about" className="text-sm">
            Our Story
          </Link>

          <Link href="/about" className="text-sm">
            Environmental Impact
          </Link>
          <Link href="/about" className="text-sm">
            Marylebone Store
          </Link> */}

              <p className="text-xs">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorem ipsam, aliquid corporis ratione cupiditate iste
                veritatis accusantium assumenda quia repellendus maiores,
                quisquam vel et cum sit, repudiandae tempore culpa quaerat
                voluptatum fugit eos. Voluptatum, quaerat omnis! Consectetur
                veniam facere voluptatibus. Officia quaerat aliquid incidunt
                voluptates! Voluptates magnam fugiat, nesciunt culpa laborum
                provident aut excepturi dolores ullam quia et perferendis
              </p>
            </div>
          </div>

          {/* <div className="flex w-full gap-5">
            <Link className="text-base" href="/">
              <FaFacebookF />
            </Link>
            <Link className="text-base" href="/">
              <FaXTwitter />
            </Link>
            <Link className="text-base" href="/">
              <FaInstagram />
            </Link>
            <Link className="text-base" href="/">
              <FaPinterest />
            </Link>
            <Link className="text-base" href="/">
              <FaLinkedin />
            </Link>
          </div> */}

          <Image
            src={paymentMethodLogo}
            className="w-48"
            height={50}
            width={192}
            alt="payment methods"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* info */}
        <div>
          <h2 className="font-bold text-xl">Important Links</h2>

          <div className="mt-2 flex flex-col gap-3">
            <Link href="/about" className="text-sm">
              About Us
            </Link>
            <Link href="/terms-condition" className="text-sm">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="text-sm">
              Privacy Policy
            </Link>
            {/* 
            <Link href="/refund-policy" className="text-sm">
              Refund Policy
            </Link> */}
            <a target="_blank" href="/sitemap.xml" className="text-sm">
              Sitemap
            </a>
          </div>

          <div className="flex w-full gap-5 mt-5">
            <Link
              aria-label="MNMRiDEZ Facebook"
              target="_blank"
              className="text-base"
              href="/"
            >
              <FaFacebookF />
            </Link>
            <Link
              aria-label="MNMRiDEZ Twitter"
              target="_blank"
              className="text-base"
              href="/"
            >
              <FaXTwitter />
            </Link>
            <Link
              aria-label="MNMRiDEZ Instagram"
              target="_blank"
              className="text-base"
              href="/"
            >
              <FaInstagram />
            </Link>
            {/* <Link className="text-base" href="/">
              <FaPinterest />
            </Link> */}
            <Link
              aria-label="LinkedIn"
              target="_blank"
              className="text-base"
              href="/"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* contact */}
        <div>
          <h2 className="font-bold text-xl">Info</h2>

          <div className="mt-2 flex flex-col gap-3">
            <div className="text-sm flex gap-2 items-center">
              <span>
                <IoHomeOutline />
              </span>

              <p>5A Edward St. Fawkner </p>
            </div>
            <div className="text-sm flex gap-2 items-center">
              <span>
                <FiPhone />
              </span>

              <a href="telto:23123123"> 212312313 </a>
            </div>
            <div className="text-sm flex gap-2 items-center">
              <span>
                <FaRegEnvelope />
              </span>

              <a className="truncate" href="mailto:booking@example.com">
                {" "}
                booking@example.com{" "}
              </a>
            </div>

            <Link
              href={"/contact"}
              className="flex items-center justify-center bg-gradient-to-r from-[#2A2470] to-[#2A2470] px-8 py-2 text-white font-bold mt-2"
            >
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
