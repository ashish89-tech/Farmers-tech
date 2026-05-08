
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_SmOsP8gPuczQwQ",
  key_secret: "fXCJEdZttS5lx5s2RSv7UMoP",
});

app.post("/create-order", async (req, res) => {

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_order",
  };

  try {

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    console.log(error);

    res.status(500).send("Error");

  }

});

app.listen(5000, () => {
  console.log("Server Running on port 5000");
});