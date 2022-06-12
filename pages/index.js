import { useEffect, useState } from "react";
import getStripe from "../getStripe";
import { API } from "aws-amplify";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("shopperapi", "/shop/products").then((productData) =>
      setProducts(productData)
    );
  }, []);

  const handleProductClick = async (priceId) => {
    const stripe = await getStripe();
    const data = await API.post("shopperapi", "/shop/checkout-sessions", {
      body: { priceId, fulfillmentDate: new Date().toISOString() },
    });

    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <main>
      {products.map((product) => {
        return (
          <article
            style={{
              border: "1px solid black",
              margin: "20px",
              display: "flex",
            }}
            key={product.priceId}
            onClick={() => handleProductClick(product.priceId)}
          >
            <div>
              <img
                src={product.image}
                alt={product.description}
                width="300px"
                height="300px"
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
          </article>
        );
      })}
    </main>
  );
};

export default Home;
