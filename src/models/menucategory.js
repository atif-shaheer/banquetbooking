const mongoose = require("mongoose");

const menuCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true
    },
    category_type: {
        type: String,
        required: true,
        enum: ["veg", "non-veg", "both"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);