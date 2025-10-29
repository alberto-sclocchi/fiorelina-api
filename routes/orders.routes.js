const router = require("express").Router();
const Order = require("../models/Order.model");


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

module.exports = router;