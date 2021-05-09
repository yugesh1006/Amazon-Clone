const functions = require("firebase-functions");
const express =require("express");
const cors =require("cors");
const { request, response } = require("express");
const stripe=require("stripe")
('sk_test_51IouvhSFG5tRkOpoba2t71SkrPTE9CeaHS2juDnkUm62uJtxgiifxKClfZVD2cZfYWUPJpfo3n7H03tt3xFP9e8G00kTtNniDH')


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, 
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-999f4/us-central1/api