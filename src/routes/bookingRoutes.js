const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/bookings", bookingController.createBooking);
router.get("/bookings", bookingController.getAllBookings);
router.put("/bookings/:id", bookingController.updateBooking);
router.get("/bookings/search", bookingController.searchBookingByHall);
router.get("/bookings/search-menu", bookingController.searchBookingByMenuItem);

module.exports = router;
