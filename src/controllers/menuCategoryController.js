const MenuCategory = require("../models/MenuCategory");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { category_name, category_type } = req.body;
    const newCategory = new MenuCategory({ category_name, category_type });
    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", data: newCategory });
  } catch (err) {
    res.status(400).json({ message: "Error creating category", error: err.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await MenuCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category", error: err.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await MenuCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category updated", data: updatedCategory });
  } catch (err) {
    res.status(400).json({ message: "Error updating category", error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await MenuCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted", data: deletedCategory });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
};
