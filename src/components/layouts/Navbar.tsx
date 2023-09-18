"use client";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  return (
    <div className="w-full h-[70px] bg-[#15305d] px-10 flex items-center justify-between">
      <h1 className="text-white text-xl">MyAdmin</h1>
      <div className="flex space-x-2 items-center">
        <Link className="text-white text-sm hover:underline" href="/myreport">
          myReport
        </Link>
        <Separator
          orientation="vertical"
          className="bg-white text-white h-8 w-[1px]"
        />
        <Avatar className="w-8 h-8">
          <AvatarImage className="" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Navbar;
