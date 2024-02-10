"use client"
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import {  useSelector } from "react-redux";

const Navbar = () => {
    const router=useRouter();
    const selector=useSelector((state:any)=>state.cartProducts);
  return (
    <div className="flex pt-2 items-center justify-between mx-3 z-1000 bg-white pb-2">
      <h1 className="mt-4 ml-4 cursor-pointer text-xl font-bold" onClick={()=>{router.push("/")}}>E-Store</h1>
      <div className="">
        <button onClick={()=>{router.push("/cart")}} className="bg-black  mt-2 rounded-md text-white p-2 flex">
          <ShoppingBag color="white" size={20} />
          <span className="pl-1 ">{selector.length}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
