import React from "react";
import { formatCurrency } from "system/utils";
import Link from "next/link";
import Image from "next/image";

export default function Product({ product }) {
  return (
    <Link href={`/product/${product.name}`}>
      <div className="max-w-xs bg-white rounded-lg border-gray-200 shadow-md cursor-pointer">
        <Image
          className="rounded-t-lg"
          height="350"
          width="350"
          src={product.image}
          alt="product image"
        />

        <div className="p-5 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h5>

          <h2>{formatCurrency(product.price)}</h2>
          <p className="mb-3 font-normal text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
