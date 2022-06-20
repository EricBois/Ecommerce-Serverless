import React from "react";
import Controls from "./Controls";
import Image from "next/image";

export default function CartProduct({ product }) {
  return (
    <div className="flex flex-col mb-10" key={product.id}>
      <div className="flex place-items-center flex-col sm:flex-row">
        <Image
          className="rounded-t-lg"
          height="350"
          width="350"
          src={product.image}
          alt="product image"
        />
        <div className="flex flex-col pl-5">
          <span className="font-bold text-xl sm:text-4xl">{product.name}</span>
          <span className="py-2 text-xl">{product.description}</span>
          <Controls isCart product={product} />
        </div>
      </div>
    </div>
  );
}
