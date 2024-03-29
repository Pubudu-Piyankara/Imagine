"use client";
import { navLinks } from "@/constants";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-blue-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image
            src="/assets/images/logo.png"
            alt="EAGER"
            width={200}
            height={100}
          />
        </Link>

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col items-start  md:flex gap-4">
              {navLinks.slice(0,6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-blue-300/50 hover:shadow-inner group ${
                      isActive ? "bg-[#4743E0]  text-white hover:text-[#4743E0]"  : "text-gray-900"
                    } `}
                  >
                    <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && "text-white brightness-20"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              </ul>
              <ul>
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-slate-300 hover:shadow-inner group ${
                      isActive ? "bg-[#4743E0]  text-white hover:text-[#4743E0]" : "text-gray-900"
                    } `}
                  >
                    <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && "text-white brightness-20"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className=" flex cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-blue-600 bg-cover">
              <Link href="/sign-in">Log In</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
