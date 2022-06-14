const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const app = express();
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/cart", async function (req, res) {
  try {
    const items = await dynamo.scan({ TableName: "cart" }).promise();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.post("/cart", async function (req, res) {
  try {
    const item = await dynamo
      .put({
        TableName: "cart",
        ReturnValues: "ALL_OLD",
        Item: {
          id: req.body.priceId,
          description: req.body.description,
          name: req.body.name,
          image: req.body.image,
          price: req.body.price,
          quantity: req.body.quantity ?? 1,
        },
      })
      .promise();
    res.json(req.body); // Dynamo only return all_old or none on put so it get returned undefined
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.delete("/cart", async function (req, res) {
  try {
    const item = await dynamo
      .delete({
        TableName: "cart",
        ReturnValues: "ALL_OLD",
        Key: {
          id: req.body.id,
        },
      })
      .promise();
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

module.exports = app;
