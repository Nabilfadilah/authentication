const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// Mengimpor controller
const {
  getUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
  resetUserPassword
} = require("../controllers/userController");

// rute untuk mendapatkan profil pengguna yang sedang login
router.get("/profile", verifyToken, getUserProfile);

// rute untuk mendapatkan semua pengguna (hanya bisa diakses oleh admin)
router.get("/users", verifyToken, isAdmin, getAllUsers);

// rute untuk memperbarui data pengguna (baik oleh user sendiri atau admin)
router.put("/users/:id", verifyToken, updateUser);

// rute untuk menghapus pengguna (hanya admin)
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

// rute untuk mereset password pengguna (hanya admin)
router.put("/users/:id/reset-password", verifyToken, isAdmin, resetUserPassword);

module.exports = router;
