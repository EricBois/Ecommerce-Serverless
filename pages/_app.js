import "../styles/globals.css";
import Amplify from "aws-amplify";
import config from "aws-exports";
import { Header } from "components";
import { CartProvider } from "hooks";

Amplify.configure(config);

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
