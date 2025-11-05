const router = require("express").Router();
const Product = require("../models/Product.model");
const uploadCloud = require("../config/cloudinary.js")


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

  if (!name || !price || !ingredients) {
    res.json({success: "false", message: "Fill out all the fields before submitting"});
    return;
  }

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

router.patch("/:productId", uploadCloud.single("imageUrl"), (req, res, next) => {
  console.log(req.file);

  Product.findByIdAndUpdate(req.params.productId, {imageUrl:req.file.path}, {new:true})
  .then((product) => {
    res.json({success: "true", data: product});
  })
  .catch((err) =>{
    res.json({success: "false", message: err});
  });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
  .then((product) => {
    res.json({success: "true", data: product});
  })
  .catch((err) =>{
    res.json({success: "false", message: err});
  });
});

module.exports = router;
