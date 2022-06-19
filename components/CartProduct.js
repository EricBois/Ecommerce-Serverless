import React from "react";
import { formatCurrency, safeRound } from "system/utils";

export default function CartProduct({
  removeFromCart,
  setQuantity,
  product,
  quantity,
}) {
  return (
    <div className="flex flex-col mb-10" key={product.id}>
      <div className="flex place-items-center flex-col sm:flex-row">
        <img className="w-48" src={product.image} alt="product image" />
        <div className="flex flex-col pl-5">
          <span className="font-bold text-xl sm:text-4xl">{product.name}</span>
          <span className="py-2 text-xl">{product.description}</span>
          <div>
            <label className="w-full text-gray-700 text-sm font-semibold">
              Quantity
            </label>
            <div className="flex flex-row h-8 w-24 rounded-lg relative bg-transparent my-2">
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
            className="text-sm rounded bg-orange-700 py-2 px-3 mt-2 text-white hover:bg-orange-800 w-36"
            onClick={() => removeFromCart(product.id)}
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
}
