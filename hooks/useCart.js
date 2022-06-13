import { useEffect, useState } from "react";
import { API } from "aws-amplify";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get("shopperapi", "/cart").then((data) => setCart(data.Items));
  }, []);

  const addToCart = async (product) => {
    await API.post("shopperapi", "/cart", {
      body: product,
    }).then((data) => setCart([...cart, data]));
  };

  const removeFromCart = async (productId) => {
    await API.del("shopperapi", "/cart", {
      body: { id: productId },
    }).then((data) =>
      setCart(cart.filter((p) => p.priceId !== data.Attributes.id))
    );
  };

  return { cart, addToCart, removeFromCart };
};

// if id already in there make a warning
// add data like name and all
