const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name:{
        type: String
    },
    price:{
        type: Number
    },
    ingredients:{
        type: [String]
    },
    imageUrl:{
        type: String,
        default: "https://www.giverecipe.com/wp-content/uploads/2020/06/Chocolate-Strawberry-Cake-Recipe.jpg"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
