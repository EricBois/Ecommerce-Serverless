import React from "react";
import { useCart, useProducts } from "../hooks";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { handleCheckout } = useProducts();
  const productsTotal = cart.map((item) => ({
    price: item.id,
    quantity: item.quantity,
  }));
  const subTotal = cart.reduce((accum, item) => accum + item.price, 0);

  return (
    <div className="grid grid-cols-1">
      <h1 className="text-4xl	text-center font-bold mt-5">Your Cart</h1>
      <div className="grid grid-cols-2 bg-white min-h-screen m-5 rounded-lg p-20">
        {cart.length > 0 ? (
          <div className="flex flex-col">
            {cart.map((product) => (
              <div className="flex flex-col mt-10" key={product.id}>
                <div className="flex flex-row">
                  <img
                    className="w-48"
                    src={product.image}
                    alt="product image"
                  />
                  <div className="flex flex-col pl-5">
                    <span className="font-bold text-4xl">{product.name}</span>
                    <span className="py-2 text-xl">{product.description}</span>
                    <span>
                      Quantity:{" "}
                      <span className="font-bold pl-2">{product.quantity}</span>
                    </span>
                    <span className="text-orange-700 font-bold">
                      Price:{" "}
                      <span className="text-black font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "CAD",
                        }).format(product.price)}
                      </span>
                    </span>
                    <button
                      className="text-2xl rounded bg-orange-700 py-2 px-3 mt-2 text-white hover:bg-orange-800"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="justify-self-end">Your cart is empty</span>
        )}
        {cart.length > 0 && (
          <div className="bg-gray-200 rounded-lg h-2/3 flex flex-col ">
            <div className="p-5 flex flex-col h-full">
              <span className="text-center font-bold text-3xl mb-5">
                {cart.length} Item&apos;s Added
              </span>
              <span className="text-gray-700 text-sm font-semibold">
                Subtotal:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "CAD",
                }).format(subTotal)}
              </span>
            </div>
            <div className="place-self-end w-full">
              <button
                className="text-3xl rounded bg-orange-700 h-24 py-2 px-3 w-full text-white hover:bg-orange-800"
                onClick={() => handleCheckout(productsTotal)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
