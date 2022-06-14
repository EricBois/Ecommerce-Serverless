import React from "react";
import { useCart, useProducts } from "../hooks";

export default function cart() {
  const { cart, removeFromCart } = useCart();
  const { handleCheckout } = useProducts();
  const productsTotal = cart.map((item) => ({
    price: item.id,
    quantity: 1,
  }));

  return (
    <div className="grid grid-cols-1">
      <h1 className="text-4xl	text-center font-bold mt-5">Your Cart</h1>
      <div className="grid grid-cols-2 bg-white min-h-screen m-5 rounded-lg p-5">
        <div>
          {cart.map((product) => (
            <div className="flex flex-col" key={product.id}>
              <div className="flex flex-row">
                <img className="w-24" src={product.image} />
                <span className="px-2 place-self-center">{product.name}</span>
                <span className="place-self-center">1975</span>
              </div>
              <div>
                <span className="px-2">{product.description}</span>
              </div>
            </div>
            // <div key={product.id}>
            //   <div>{product.name}</div>

            //   <button onClick={() => removeFromCart(product.id)}>delete</button>
            // </div>
          ))}
        </div>
        <div>
          {cart.map((product) => (
            <div key={product.id}>
              {product.name}
              <button onClick={() => removeFromCart(product.id)}>delete</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={() => handleCheckout(productsTotal)}>Checkout</button>
      </div>
    </div>
  );
}
