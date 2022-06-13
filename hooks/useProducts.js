import { useEffect, useState } from "react";
import getStripe from "../getStripe";
import { API } from "aws-amplify";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("shopperapi", "/shop/products").then((productData) =>
      setProducts(productData)
    );
  }, []);

  const handleCheckout = async (priceId) => {
    const stripe = await getStripe();
    const data = await API.post("shopperapi", "/shop/checkout-sessions", {
      body: { priceId, fulfillmentDate: new Date().toISOString() },
    });

    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return { products, handleCheckout };
};
