import { useEffect, useState } from "react";
import getStripe from "../getStripe";
import { API } from "aws-amplify";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterBy, setFilterBy] = useState();

  useEffect(() => {
    setIsLoading(true);
    API.get("shopperapi", "/shop/products")
      .then((productData) => setProducts(productData.filter((p) => p.active)))
      .then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter((p) => p.metadata.category === filterBy && p.active)
    );
  }, [filterBy]);

  const handleCheckout = async (priceIds) => {
    const stripe = await getStripe();
    const data = await API.post("shopperapi", "/shop/checkout-sessions", {
      body: { priceIds },
    });

    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return {
    products: filtered.length > 0 ? filtered : products,
    handleCheckout,
    isLoading,
    setFilterBy,
  };
};
