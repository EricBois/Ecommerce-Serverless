const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const Stripe = require("stripe");
const app = express();

app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(async (req, _, next) => {
  req.stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  next();
});

//  * get method to access stripe products *

app.get("/shop/products", async function (req, res) {
  const stripe = new Stripe(req.stripeSecretKey);

  try {
    const productPriceData = await stripe.prices.list({
      expand: ["data.product"],
    });

    const productData = productPriceData.data.map(
      ({ product, unit_amount, id }) => ({
        name: product.name,
        active: product.active,
        description: product.description,
        price: unit_amount / 100,
        image: product.images[0],
        priceId: id,
        metadata: product.metadata,
      })
    );

    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

//* post method to create checkout session *

app.post("/shop/checkout-sessions", async (req, res) => {
  const stripe = new Stripe(req.stripeSecretKey);

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.priceIds,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${req.headers.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/order/canceled`,
      metadata: {
        fulfillmentDate: new Date().toISOString(),
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
    });

    res.status(200).json(session);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

// * get method to access checkout session from client *

app.get("/shop/checkout-sessions/:customerSessionId", async (req, res) => {
  const stripe = new Stripe(req.stripeSecretKey);

  const id = req.params.customerSessionId;

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(id);
    console.log(
      "the customer session",
      JSON.stringify(checkoutSession, null, 2)
    );
    res.json(checkoutSession);
  } catch (err) {
    res.status(404).json({ statusCode: 404, message: err.message });
  }
});

module.exports = app;
