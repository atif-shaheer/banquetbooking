const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const upload = require("../middleware/upload");

router.post("/menu-items", upload.single("image"), menuController.addMenuItem);
router.get("/menu-items", menuController.getAllMenuItems);

module.exports = router;
