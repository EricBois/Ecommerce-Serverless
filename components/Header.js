import Image from "next/image";
import Link from "next/link";
import React from "react";
import Cart from "assets/cart.png";
import { useCart } from "hooks";

export default function Header() {
  const { cart } = useCart();

  return (
    <div className="bg-[#263238] shadow-lg py-5 px-7">
      <nav className="flex justify-between">
        <div className="flex items-center space-x-3 lg:pr-16 pr-6">
          <Link href="/">
            <h1 className="font-normal text-2xl leading-6 text-white cursor-pointer">
              Eric&apos;s Store
            </h1>
          </Link>
        </div>

        <div className="relative hover:scale-105 flex space-x-5 justify-center items-center p-4 bg-white rounded-full">
          <Link href="/cart" passHref>
            <a>
              <Image
                width="50"
                height="50"
                className=" cursor-pointer"
                src={Cart}
                alt="Cart image"
              />

              {cart.length > 0 && (
                <span className="absolute inset-0 object-right-top -mr-6">
                  <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    {cart.length}
                  </div>
                </span>
              )}
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
