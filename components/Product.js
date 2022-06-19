import React from "react";
import { formatCurrency } from "system/utils";
import Controls from "./Controls";
import Link from "next/link";

export default function Product({ product }) {
  return (
    <div className="max-w-sm bg-white rounded-lg border-gray-200 shadow-md">
      <Link href={`/products/${product.name}`}>
        <img
          className="rounded-t-lg h-72"
          src={product.image}
          alt="product image"
        />
      </Link>
      <div className="p-5 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {product.name}
        </h5>

        <h2>{formatCurrency(product.price)}</h2>
        <p className="mb-3 font-normal text-gray-700">{product.description}</p>
        <Controls product={product} />
      </div>
    </div>
  );
}
