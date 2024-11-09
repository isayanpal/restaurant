const MenuCategory = require("../models/MenuCategory");
const SubCategory = require("../models/SubCategory");
const FoodItem = require("../models/FoodItem");

//create new menu category
const createCategory = async (req, res) => {
  try {
    const category = new MenuCategory({ name: req.body.name });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//add a subcategory to a menu category
const createSubCategory = async (req, res) => {
  try {
    const subCategory = new SubCategory({ name: req.body.name });
    const savedSubCategory = await subCategory.save();

    const category = await MenuCategory.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Menu Category not found" });
    }
    category.subcategories.push(savedSubCategory._id);
    await category.save();

    res.status(201).json(savedSubCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a food item to a subcategory
const addFoodItem = async (req, res) => {
  try {
    // Step 1: Create and save the FoodItem
    const foodItem = new FoodItem({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients || "",
    });
    const savedFoodItem = await foodItem.save();

    // Step 2: Find the SubCategory and add the FoodItem reference
    const subCategory = await SubCategory.findById(req.params.subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    subCategory.items.push(savedFoodItem._id);
    await subCategory.save();

    // Step 3: Send the response only once
    res.status(201).json(savedFoodItem);
  } catch (error) {
    if (!res.headersSent) {
      // Check if headers were already sent
      res.status(400).json({ message: error.message });
    } else {
      console.error("Error after response sent:", error);
    }
  }
};

// Get all menu categories with subcategories and items
const getCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find().populate({
      path: "subcategories",
      populate: {
        path: "items",
      },
    });

    // console.log(
    //   "Fetched Categories with Subcategories and Items:",
    //   JSON.stringify(categories, null, 2)
    // );

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  createSubCategory,
  addFoodItem,
  getCategories,
};
