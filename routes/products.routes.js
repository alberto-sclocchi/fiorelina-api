const router = require("express").Router();
const Product = require("../models/Product.model");


router.get("/", (req, res, next) => {
  Product.find()
  .then((products) => {
    res.json({success: "true", data: products});
  })
  .catch((err) =>{
    res.json({success: "false", message: err});
  });
});

router.post("/", (req, res, next) => {
  const { name, price, ingredients } = req.body;

  productAdded ={
    name,
    price: +price,
    ingredients: typeof ingredients === "string" ? ingredients.split(" ") : []
  }

  Product.create(productAdded)
  .then((product) => {
    res.json({success: "true", data: product});
  })
  .catch((err) =>{
    res.json({success: "false", message: err});
  });
});

module.exports = router;
