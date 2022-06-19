import React, { useEffect, useState } from "react";
import { useCart } from "hooks";
import CartProduct from "./CartProduct";
import Product from "./Product";

export default function ListProducts({ product, isCart }) {
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const currentQuantity = cart.find((p) => p.id === product.priceId)?.quantity;
  const [quantity, setQuantity] = useState(currentQuantity ?? 1);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (currentQuantity) updateQuantity(product.priceId, quantity);
  }, [quantity]);

  useEffect(() => {
    setIsDisabled(Boolean(cart.find((p) => p.id === product.priceId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return isCart ? (
    <CartProduct
      removeFromCart={removeFromCart}
      setQuantity={setQuantity}
      product={product}
      quantity={quantity}
    />
  ) : (
    <Product
      setQuantity={setQuantity}
      product={product}
      quantity={quantity}
      addToCart={addToCart}
      isDisabled={isDisabled}
    />
  );
}
