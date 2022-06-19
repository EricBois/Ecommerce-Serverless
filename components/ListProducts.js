import React from "react";
import CartProduct from "./CartProduct";
import Product from "./Product";

export default function ListProducts({ product, isCart }) {
  return isCart ? (
    <CartProduct product={product} />
  ) : (
    <Product product={product} />
  );
}
