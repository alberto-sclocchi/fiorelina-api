const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const orderSchema = new Schema(
  {
    name:{
        type: String
    },
    address:{
        type: String
    },
    email:{
        type: String
    },
    phone_number:{
        type: String
    },
    products:[
        {   
            Product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number }
        }
    ],
    total_price:{
        type: Number
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;