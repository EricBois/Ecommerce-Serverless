import React, { useState, useEffect } from "react";
import { useCart } from "hooks";
import { formatCurrency, safeRound } from "system/utils";

export default function Controls({ product, isCart }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const currentQuantity = cart.find((p) => p.id === product.priceId)?.quantity;
  const [quantity, setQuantity] = useState(currentQuantity ?? 1);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (currentQuantity) updateQuantity(product.priceId, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    setIsDisabled(Boolean(cart.find((p) => p.id === product.priceId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      <div>
        <label className="w-full text-gray-700 text-sm font-semibold">
          Quantity
        </label>
        <div
          className={`flex flex-row h-8 ${
            isCart ? "w-24" : "w-36"
          } rounded-lg relative bg-transparent my-2`}
        >
          <button
            data-action="decrement"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className=" bg-orange-700 text-white hover:bg-orange-800 h-full w-20 rounded-l cursor-pointer outline-none"
          >
            <span className="m-auto text-2xl font-bold">−</span>
          </button>
          <span className="focus:outline-none text-center w-full place-self-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default text-gray-700  outline-none">
            {quantity}
          </span>
          <button
            data-action="increment"
            onClick={() => setQuantity(quantity >= 1 ? quantity + 1 : 1)}
            className="bg-orange-700 text-white hover:bg-orange-800 h-full w-20 rounded-l cursor-pointer outline-none"
          >
            <span className="m-auto text-2xl font-bold">+</span>
          </button>
        </div>
        {isCart && (
          <span className="text-orange-700 font-bold">
            Price:{" "}
            <span className="text-black font-bold">
              {formatCurrency(safeRound(product.price * product.quantity))}
            </span>
            {product.quantity > 1 && (
              <div>
                <span className="text-sm text-orange-900">
                  ( {formatCurrency(product.price)} each )
                </span>
              </div>
            )}
          </span>
        )}
      </div>

      <div>
        {isCart ? (
          <button
            className="text-sm rounded bg-orange-700 py-2 px-3 mt-2 text-white hover:bg-orange-800 w-36"
            onClick={() => removeFromCart(product.id)}
          >
            Remove Item
          </button>
        ) : (
          <button
            disabled={isDisabled}
            onClick={() => {
              addToCart(product, quantity);
            }}
            className="disabled:bg-orange-900 font-bold h-24 w-48 mt-5 items-center py-2 px-3 text-lg text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {isDisabled ? "Added To Cart" : "Add To Cart"}
          </button>
        )}
      </div>
    </>
  );
}
