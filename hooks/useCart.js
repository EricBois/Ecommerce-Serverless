import { createContext, useContext, useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const cookie = cookieCutter.get("ericstorecookie");
    if (cookie) {
      setCart(JSON.parse(cookie));
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = async (product, quantity) => {
    const updatedProduct = { ...product, quantity, id: product.priceId };
    cookieCutter.set(
      "ericstorecookie",
      JSON.stringify([...cart, updatedProduct])
    );
    setCart([...cart, updatedProduct]);
  };

  const updateQuantity = async (productId, value) => {
    const updatedProduct = cart.map((item) =>
      item.priceId === productId ? { ...item, quantity: value } : item
    );
    cookieCutter.set("ericstorecookie", JSON.stringify([...updatedProduct]));
    setCart([...updatedProduct]);
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((p) => p.id !== productId);
    cookieCutter.set("ericstorecookie", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <LocalStateProvider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isLoading,
        updateQuantity,
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
