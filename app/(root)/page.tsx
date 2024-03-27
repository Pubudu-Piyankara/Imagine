import { navLinks } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="sm:flex-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner2 bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="h1-semibold max-w-[500px] flex-wrap text-center text-white shadow-sm">
          Unlock Your Creative Potential with Imagine.
        </h1>
        <ul className="flex-center w-full gap-1">
          {navLinks.slice(1, 5).map((link) => (
            <a
              href={link.route}
              key={link.route}
              
            >
              <Image
                className="flex-col bg-white text-dark-700 rounded-full p-4"
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                />
              <li className="">
                
               <p className="button bg-none text-white"> {link.label}</p>
              </li>
            </a>
          ))}
        </ul>
      </section>
      
    </>
  );
};

export default Home;
