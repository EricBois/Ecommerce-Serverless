const express = require("express");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { createCognitoUser } = require("./createCognitoUser");
const Stripe = require("stripe");
const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post(
  "/payment-webhook",
  express.raw({ type: "application/json" }),
  async function (req, res) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripeWebhookSecret = process.env.STRIPE_SECRET_WEBHOOK;
    const stripe = new Stripe(stripeSecretKey);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        stripeWebhookSecret
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const paymentIntent = event.data.object;
        const { email } = paymentIntent.customer_details;

        const user = await createCognitoUser({
          UserPoolId: process.env.AUTH_SHOPPINGD7F30E31_USERPOOLID,
          Username: email,
        });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
  }
);

app.listen(3000, function () {
  console.log("App started");
});
module.exports = app;
