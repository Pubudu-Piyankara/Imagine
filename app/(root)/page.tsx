import CardColllection from "@/components/shared/Card";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Home =  async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})
  return (
    <>
      <section className="sm:flex-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner1 bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="h1-semibold max-w-[500px] flex-wrap pb-4 pt-2 text-center text-white shadow-sm">
          Unlock Your Creative Potential with Imagine...
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <a
              href={link.route}
              key={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image
                  src={link.icon}
                  alt="{link.label}"
                  width={24}
                  height={24}
                />
              </li>
              <p className="button p-14-medium text-center bg-none text-white"> {link.label}</p>
            </a>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <CardColllection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
