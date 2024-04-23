const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  userBasket,
  getUserBasket,
  getWishlist,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);

router.post("/basket", authMiddleware, userBasket);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/all-users", getAllUsers);
router.get("/basket", authMiddleware, getUserBasket);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getOneUser);

router.delete("/:id", deleteUser);

router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
