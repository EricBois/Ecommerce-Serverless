import { createContext, useContext, useEffect, useState } from "react";
import { API } from "aws-amplify";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    API.get("shopperapi", "/cart")
      .then((data) => setCart(data.Items))
      .then(() => setIsLoading(false));
  }, []);

  const addToCart = async (product) => {
    await API.post("shopperapi", "/cart", {
      body: {
        id: product.priceId,
        ...product,
      },
    }).then((data) => setCart([...cart, data]));
  };

  const removeFromCart = async (productId) => {
    await API.del("shopperapi", "/cart", {
      body: { id: productId },
    }).then((data) => setCart(cart.filter((p) => p.id !== data.Attributes.id)));
  };

  return (
    <LocalStateProvider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isLoading,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}
export { CartProvider, useCart };
