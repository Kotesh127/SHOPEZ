const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:id", protect, updateCart);
router.delete("/:id", protect, deleteCartItem);
router.delete("/", protect, clearCart);

module.exports = router;