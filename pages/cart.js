import React from "react";
import { useCart, useProducts } from "../hooks";

export default function cart() {
  const { cart, removeFromCart } = useCart();
  const { handleCheckout } = useProducts();
  const productsTotal = cart.map((item) => ({
    price: item.id,
    quantity: item.quantity,
  }));

  return (
    <div className="grid grid-cols-1">
      <h1 className="text-4xl	text-center font-bold mt-5">Your Cart</h1>
      <div className="grid grid-cols-2 bg-white min-h-screen m-5 rounded-lg p-10">
        <div className="flex flex-col">
          {cart.map((product) => (
            <div className="flex flex-col mt-5" key={product.id}>
              <div className="flex flex-row">
                <img className="w-48" src={product.image} />
                <div className="flex flex-col pl-5">
                  <span className="px-2 place-self-center text-4xl">
                    {product.name}
                  </span>
                  <span className="px-2 py-2 text-xl">
                    {product.description}
                  </span>
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
                </div>
                <div className="pl-10">
                  <button
                    className="text-3xl rounded-full bg-orange-700 py-2 px-3 text-white hover:bg-orange-800"
                    onClick={() => removeFromCart(product.id)}
                  >
                    &#x2715;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className="text-3xl rounded bg-orange-700 py-2 px-3 text-white hover:bg-orange-800"
            onClick={() => handleCheckout(productsTotal)}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
