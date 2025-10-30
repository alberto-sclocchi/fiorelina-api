const router = require("express").Router();
const Order = require("../models/Order.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



router.get("/", (req, res, next) => {
  Order.find()
  .then((orders) => {
    res.json({success: "true", data: orders});
  })
  .catch((err) =>{
    res.json({success: "false", message: err});
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  Order.create(req.body)
  .then((order) => {
    res.json({success: "true", data: order});
  })
  .catch((err) =>{
    res.json({success: "false", message: err});
  });
});

router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body);

  const lineItems = req.body.map(product => {
    return {
      price_data:{
        currency: 'usd',
        product_data:{
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100),
      },      
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.ORIGIN}?success=true`,
    cancel_url: `${process.env.ORIGIN}?success=false`,
  });

  res.json({ url: session.url });

});

module.exports = router;