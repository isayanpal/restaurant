const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
