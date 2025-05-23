const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

// Replace with your SMTP credentials and email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Or your SMTP provider
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // your email (e.g., example@gmail.com)
    pass: process.env.SMTP_PASS  // your app password
  }
});

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Construct the booking summary
    const bookingDetails = `
        <h2 style="text-align:center; font-family: Arial, sans-serif; color: #333;">Booking Confirmation</h2>

        <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <tbody>
            <tr style="border-bottom: 1px solid #ccc;">
              <td style="padding: 8px; font-weight: bold;">Booking ID:</td>
              <td style="padding: 8px;">${booking.booking_id}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Hall Name:</td>
              <td style="padding: 8px;">${booking.hall_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${booking.guest_name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Mobile No:</td>
              <td style="padding: 8px;">${booking.mobile_no}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">No. of Packs:</td>
              <td style="padding: 8px;">${booking.no_of_packs}</td>
            </tr>  
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Rate Plan:</td>
              <td style="padding: 8px;">${booking.rate_plan}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Advance Payment:</td>
              <td style="padding: 8px;">₹${booking.advance_payment}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Total Payment:</td>
              <td style="padding: 8px;">₹${booking.total_payment}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Balance:</td>
              <td style="padding: 8px;">₹${booking.balance}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Food Type:</td>
              <td style="padding: 8px;">${booking.veg_non_veg}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Menu Items:</td>
              <td style="padding: 8px;">${booking.menu_item.join(", ")}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Notes:</td>
              <td style="padding: 8px;">${booking.notes}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Status:</td>
              <td style="padding: 8px;">${booking.status}</td>
            </tr>
          </tbody>
        </table>
            `;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: [booking.email, "aatif.sahir9@gmail.com"], // send to user + admin
      subject: "Booking Confirmation - Regalia Banquet & Resort",
      html: bookingDetails
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Booking created and emails sent", booking });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({data:bookings});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/bookings/search?hall_name=Regalia Hall
exports.searchBookingByHall = async (req, res) => {
  try {
    const { hall_name } = req.query;
    if (!hall_name) {
      return res.status(400).json({ error: "hall_name query parameter is required" });
    }

    const bookings = await Booking.find({ hall_name: { $regex: new RegExp(hall_name, "i") } });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for the given hall name" });
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/bookings/search-menu?item=Paneer Butter Masala
exports.searchBookingByMenuItem = async (req, res) => {
  try {
    const { item } = req.query;
    if (!item) {
      return res.status(400).json({ error: "item query parameter is required" });
    }

    const bookings = await Booking.find({
      menu_item: { $regex: new RegExp(item, "i") } // case-insensitive partial match
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found with the given menu item" });
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

