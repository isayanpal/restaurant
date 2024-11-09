const express = require("express");
const { createCategory, createSubCategory, addFoodItem, getCategories } = require("../controllers/menu");


const router = express.Router();

router.post("/categories", createCategory);

router.post("/categories/:categoryId/subcategories", createSubCategory);

router.post("/subcategories/:subCategoryId/items", addFoodItem);

router.get("/categories", getCategories);

module.exports = router;
