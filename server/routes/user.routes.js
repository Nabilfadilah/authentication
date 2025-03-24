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
  resetUserPassword,
  getUserById
} = require("../controllers/userController");

// rute untuk mendapatkan profil pengguna yang sedang login
router.get("/profile", verifyToken, getUserProfile);

// rute untuk mendapatkan semua pengguna (hanya bisa diakses oleh admin)
router.get("/users", verifyToken, isAdmin, getAllUsers);

// rute untuk memperbarui data pengguna (baik oleh user sendiri atau admin)
router.put("/user/:id/edit", verifyToken, updateUser);

// rute untuk menghapus pengguna (hanya admin)
router.delete("/user/:id", verifyToken, isAdmin, deleteUser);

// rute untuk mereset password pengguna (hanya admin)
router.put("/admin/reset-password/:id", verifyToken, isAdmin, resetUserPassword);

// route untuk get user by id
router.get("/users/:id", verifyToken, isAdmin, getUserById);

module.exports = router;
