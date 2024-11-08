const mongoose = require("mongoose");
const FoodItem = require("./FoodItem");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  ],
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
