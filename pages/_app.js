import "../styles/globals.css";
import Amplify from "aws-amplify";
import config from "../aws-exports";
import { CartProvider } from "use-shopping-cart";

Amplify.configure(config);

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      successUrl="/order/success"
      cancelUrl="/order/cancel"
      currency="CAD"
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
    >
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
