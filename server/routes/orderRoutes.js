const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getAllOrders,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, placeOrder);
router.get("/", protect, getOrders);

// Admin
router.get("/all", protect, admin, getAllOrders);

module.exports = router;