import { useEffect } from "react";
import { useCart, useProducts } from "../hooks";

const Home = () => {
  const { products, handleCheckout } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <main>
      {(products ?? []).map((product) => {
        return (
          <article
            style={{
              border: "1px solid black",
              margin: "20px",
              display: "flex",
            }}
            key={product.priceId}
          >
            <div>
              <img
                src={product.image}
                alt={product.description}
                width="300px"
                height="300px"
                onClick={() => addToCart(product)}
              />
            </div>
            <div>
              <h2>{product.name}</h2>
              <h2>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "CAD",
                }).format(product.price)}
              </h2>
              <p>{product.description}</p>
            </div>
            <button onClick={() => removeFromCart(product.priceId)}>
              delete
            </button>
          </article>
        );
      })}
    </main>
  );
};

export default Home;
