import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Controls from "components/Controls";
import { useProducts } from "hooks";
import { formatCurrency } from "system/utils";
import Image from "next/image";

export default function Product() {
  const { query } = useRouter();
  const [product, setProduct] = useState();
  const { products } = useProducts();

  useEffect(() => {
    setProduct(products.find((p) => p.name === query.productName));
  }, [products]);

  return (
    <>
      {product ? (
        <div className=" bg-white rounded-lg border-gray-200 shadow-md flex flex-col justify-center">
          <Image
            className="rounded-t-lg"
            width="300"
            height="300"
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
            <Controls product={product} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
