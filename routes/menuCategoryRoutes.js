const express = require("express");
const router = express.Router();
const menuCategoryController = require("../controllers/menuCategoryController");

router.post("/", menuCategoryController.createCategory);
router.get("/", menuCategoryController.getAllCategories);
router.get("/:id", menuCategoryController.getCategoryById);
router.put("/:id", menuCategoryController.updateCategory);
router.delete("/:id", menuCategoryController.deleteCategory);

module.exports = router;
