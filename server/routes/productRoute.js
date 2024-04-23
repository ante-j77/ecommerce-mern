const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
} = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middlewares/auth");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/all-products", getAllProducts);
router.get("/:id", getProduct);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.put("wishlist", authMiddleware, addToWishlist);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
