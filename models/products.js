const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  image: String,
  description: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
