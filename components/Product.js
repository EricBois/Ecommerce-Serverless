import React, { useEffect, useState } from "react";
import { useCart } from "../hooks";

export default function Product({ product }) {
  const { addToCart, cart } = useCart();
  const [isDisabled, setIsDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsDisabled(Boolean(cart.find((p) => p.id === product.priceId)));
  }, [cart]);
  return (
    <div className="max-w-sm bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg h-72" src={product.image} alt="" />
      </a>
      <div className="p-5 ">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </a>
        <h2>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "CAD",
          }).format(product.price)}
        </h2>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
        <div className="">
          <label className="w-full text-gray-700 text-sm font-semibold">
            Quantity
          </label>
          <div className="flex flex-row h-8 w-full rounded-lg relative bg-transparent my-2">
            <button
              data-action="decrement"
              onClick={() => setQuantity(quantity - 1)}
              className=" bg-orange-700 text-white hover:bg-orange-800 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-2xl font-bold">−</span>
            </button>
            <span className="focus:outline-none text-center w-full place-self-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default text-gray-700  outline-none">
              {quantity}
            </span>
            <button
              data-action="increment"
              onClick={() => setQuantity(quantity + 1)}
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
            className="disabled:bg-orange-900 font-bold w-full items-center py-2 px-3 text-sm text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isDisabled ? "Added To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
