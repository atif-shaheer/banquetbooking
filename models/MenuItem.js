const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: [String],
    required: true
  },
  image: {
    type: String // store filename
  }
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
