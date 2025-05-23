const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hall_name: {
    type: String,
    required: true,
    trim: true
  },
  whatsapp_no: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  guest_name: {
    type: String,
    required: true,
    trim: true
  },
  mobile_no: {
    type: String,
    required: true,
    trim: true
  },
  no_of_packs: {
    type: Number,
    required: true,
    min: 1
  },
  rate_plan: {
    type: String,
    required: true,
    enum: ["Platinum", "Silver", "Gold"]
  },
  notes: {
    type: String,
    default: ""
  },
  advance_payment: {
    type: Number,
    min: 0
  },
  total_payment: {
    type: Number,
    required: true,
    min: 0
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  },
  veg_non_veg: {
    type: String,
    required: true,
    enum: ["Veg", "Non-Veg", "Both"]
  },
  menu_category: {
    type: String,
    required: true
  },
  menu_item: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "At least one menu item is required."
    }
  },
  status: {
    type: String,
    enum: ["Enquiry", "Confirmed", "Cancelled"],
    default: "Enquiry"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
