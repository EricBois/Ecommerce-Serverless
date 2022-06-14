import React from "react";
import { useCart, useProducts } from "../hooks";
import { formatCurrency, safeRound } from "../system/utils";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { handleCheckout } = useProducts();
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
      <h1 className="text-4xl	text-center font-bold mt-5">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white min-h-screen m-5 rounded-lg p-20">
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
                        {formatCurrency(
                          safeRound(product.price * product.quantity)
                        )}
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
                      className="text-2xl rounded bg-orange-700 py-2 px-3 mt-2 text-white hover:bg-orange-800 w-48"
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
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
