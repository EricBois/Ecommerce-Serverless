import Link from "next/link";
import React from "react";
import Product from "../components/Product";
import { useCart, useProducts } from "../hooks";
import { formatCurrency, safeRound } from "../system/utils";
import Loading from "../components/Loading";
export default function Cart() {
  const { cart } = useCart();
  const { handleCheckout, isLoading } = useProducts();
  const productsTotal = cart.map((item) => ({
    price: item.id,
    quantity: item.quantity,
  }));
  const subTotal = cart.reduce(
    (accum, item) => accum + item.price * item.quantity,
    0
  );
  const shipping = 25;
  const taxes = 0.05;
  const grandTotal = safeRound(subTotal * (1 + taxes) + shipping);

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
              <Product key={product.id} product={product} isCart />
            ))}
          </div>
        ) : (
          <></>
        )}
        {cart.length > 0 && (
          <div className="bg-gray-200 rounded-lg h-2/3 flex flex-col mt-20 lg:mt-0 ">
            <div className="p-5 flex flex-col h-full">
              <span className="text-center font-bold text-3xl mb-10">
                {cart.length} Item&apos;s Added
              </span>
              <div className="mt-5 flex place-items-center">
                <span className="text-gray-700 text-xl font-semibold">
                  Subtotal:
                </span>
                <span className="pl-4">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex place-items-center">
                <span className="text-gray-700 text-xl font-semibold">
                  Shipping & Handling:
                </span>
                <span className="pl-4">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex place-items-center">
                <span className="text-gray-700 text-xl font-semibold">
                  taxes (5%) :
                </span>
                <span className="pl-4">
                  {formatCurrency(safeRound(subTotal * taxes))}
                </span>
              </div>
              <span className="text-3xl mt-20">
                Grand Total: {formatCurrency(grandTotal)}{" "}
              </span>
            </div>
            <div className="place-self-end w-full">
              <button
                className="text-3xl rounded bg-orange-700 h-24 py-2 px-3 w-full text-white hover:bg-orange-800"
                onClick={() => handleCheckout(productsTotal)}
              >
                {isLoading ? <Loading /> : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
