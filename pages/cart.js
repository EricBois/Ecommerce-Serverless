import Link from "next/link";
import React from "react";
import { ListProducts } from "components";
import { useCart } from "hooks";
import CartSummary from "components/CartSummary";
export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="grid grid-cols-1">
      <Link href="/">
        <button className="text-3xl text-center rounded bg-orange-700 m-2 text-white hover:bg-orange-800 w-24">
          &#8617;
        </button>
      </Link>
      <h1 className="text-4xl	text-center font-bold mt-5">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white min-h-screen m-1 lg:m-5 rounded-lg sm:p-20">
        {cart.length > 0 ? (
          <div className="flex flex-col">
            {cart.map((product) => (
              <ListProducts key={product.id} product={product} isCart />
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-center text-xl font-bold">
              Your Cart Is Empty{" "}
            </h2>
          </div>
        )}
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
