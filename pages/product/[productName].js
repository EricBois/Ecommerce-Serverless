import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Controls from "components/Controls";
import { useProducts } from "hooks";
import { formatCurrency } from "system/utils";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
  const { query } = useRouter();
  const [product, setProduct] = useState();
  const { products } = useProducts();

  useEffect(() => {
    setProduct(products.find((p) => p.name === query.productName));
  }, [products]);

  return (
    <>
      <Link href="/">
        <button className="text-3xl text-center rounded bg-orange-700 m-2 text-white hover:bg-orange-800 w-24">
          &#8617;
        </button>
      </Link>
      {product ? (
        <div className=" bg-white rounded-lg shadow-sm flex-col sm:flex-row sm:items-center flex m-5 sm:m-16">
          <div>
            <Image
              width="600"
              height="500"
              src={product.image}
              alt="product image"
            />
          </div>

          <div className="m-5 sm:ml-16">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h5>

            <span className="text-2xl">{formatCurrency(product.price)}</span>
            <p className="my-3 font-normal text-xl text-gray-700">
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
