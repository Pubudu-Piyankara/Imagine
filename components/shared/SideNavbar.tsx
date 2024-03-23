"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex flex-row justify-between flex-between fixed h-16 w-full border-b-2 border-gray-100 bg-white p-5 lg:hidden">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/logo gold.png"
          alt="EAGER"
          width={100}
          height={100}
          className=""
        />
      </Link>

      <nav className="flex flex-row gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="Menu"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="bg-white sm:w-64">
              <>
                <Image
                  src="/assets/logo gold.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
                <ul className="mt-8 flex w-full flex-col items-start gap-5">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;
                    return (
                      <li
                        key={link.route}
                        className={`group ${isActive && "gradiant-text"} `}
                      >
                        <Link
                          className="p-16-semibold flex size-full gap-4 p-4 cursor-pointer"
                          href={link.route}
                        >
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
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  );
};

export default SideNavbar;
