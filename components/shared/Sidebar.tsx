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
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/logo gold.png"
            alt="EAGER"
            width={100}
            height={100}
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements flex flex-col gap-4">
              {navLinks.slice(0,6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive ? "bg-blue-gradient text-white" : "text-gray-900"
                    } `}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && " brightness-20"}`}
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
                    className={`sidebar-nav_element group ${
                      isActive ? "bg-blue-gradient text-white" : "text-gray-900"
                    } `}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && " brightness-20"}`}
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
            <Button asChild className="button bg-blue-gradient bg-cover">
              <Link href="/sign-in">Log In</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
