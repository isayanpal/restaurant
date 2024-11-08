const mongoose = require("mongoose");
const SubCategory = require("./SubCategory");

const menuCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});
module.exports = mongoose.model("MenuCategory", menuCategorySchema);
