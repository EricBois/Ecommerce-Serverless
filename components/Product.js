import React, { useEffect, useState } from "react";
import { useCart } from "../hooks";
import { formatCurrency, safeRound } from "../system/utils";

export default function Product({ product, isCart }) {
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const [isDisabled, setIsDisabled] = useState(false);
  const currentQuantity = cart.find((p) => p.id === product.priceId)?.quantity;
  const [quantity, setQuantity] = useState(currentQuantity ?? 1);

  useEffect(() => {
    if (currentQuantity) updateQuantity(product.priceId, quantity);
  }, [quantity]);

  useEffect(() => {
    setIsDisabled(Boolean(cart.find((p) => p.id === product.priceId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return isCart ? (
    <div className="flex flex-col mt-10" key={product.id}>
      <div className="flex place-items-center flex-col sm:flex-row">
        <img className="w-48" src={product.image} alt="product image" />
        <div className="flex flex-col pl-5">
          <span className="font-bold text-xl sm:text-4xl">{product.name}</span>
          <span className="py-2 text-xl">{product.description}</span>
          <div>
            <label className="w-full text-gray-700 text-sm font-semibold">
              Quantity
            </label>
            <div className="flex flex-row h-8 w-36 rounded-lg relative bg-transparent my-2">
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
          </div>
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
          <button
            className="text-xl sm:text-2xl rounded bg-orange-700 py-2 px-3 mt-2 text-white hover:bg-orange-800 w-48"
            onClick={() => removeFromCart(product.id)}
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-sm bg-white rounded-lg border-gray-200 shadow-md">
      <img
        className="rounded-t-lg h-72"
        src={product.image}
        alt="product image"
      />

      <div className="p-5 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {product.name}
        </h5>

        <h2>{formatCurrency(product.price)}</h2>
        <p className="mb-3 font-normal text-gray-700">{product.description}</p>
        <div>
          <label className="w-full text-gray-700 text-sm font-semibold">
            Quantity
          </label>
          <div className="flex flex-row h-8 w-full rounded-lg relative bg-transparent my-2">
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
        </div>
        <div>
          <button
            disabled={isDisabled}
            onClick={() => {
              addToCart(product, quantity);
            }}
            className="disabled:bg-orange-900 font-bold w-full items-center py-2 px-3 text-sm text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {isDisabled ? "Added To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
