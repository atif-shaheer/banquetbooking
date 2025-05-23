const MenuItem = require("../models/MenuItem");

// Add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem({
      category: req.body.category,
      name: req.body.name,
      image: req.file ? req.file.filename : null
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
