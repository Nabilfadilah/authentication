// routes/user.routes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const db = require("../models");
const isAdmin = require("../middlewares/isAdmin");
const bcrypt = require("bcryptjs"); 
// const bcrypt = require("bcrypt");

// route yang hanya bisa diakses jika user sudah login
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await db.user.findByPk(req.user.id, {
      attributes: ["id", "name", "email"]
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data user", error });
  }
});

// router get all user khusus untuk role admin 
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await db.user.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data users", error: err });
  }
});

// route untuk put data user
// Jika user biasa, hanya bisa update ID-nya sendiri
// Jika admin, bisa update siapa saja
router.put("/users/:id", verifyToken, async (req, res) => {
  const { name, email, password, role, oldPassword } = req.body;
  const id = req.params.id;

  try {
    // Cek hak akses hanya admin yang bisa rubah datanya sendiri
    // dan user berdasarkan id nya sendiri
    if (req.user.role !== "admin" && req.user.id != id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    const user = await db.user.findByPk(id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // Hash password jika ada
    if (password) {

      // Jika password ingin diganti oleh user biasa → wajib masukkan oldPassword
      if (req.user.role !== "admin") {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password lama salah" });
      }

      // Hash password baru
      user.password = await bcrypt.hash(password, 10);
    }

    // Update data
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = req.user.role === "admin" ? (role ?? user.role) : user.role;

    await user.save();
    res.json({ message: "User berhasil diperbarui", user });
  } catch (error) {
    res.status(500).json({ message: "Gagal update user", error });
  }
});

// route delete user dan hanya role admin yang bisa
// Kalau token bukan admin → akan ditolak.
router.delete("/users/:id", verifyToken, async (req, res) => {
  
  // Kalau admin → user akan dihapus dari database.
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Hanya admin yang bisa menghapus user" });
  }

  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await user.destroy();
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus user", error });
  }
});

// Khusus reset password user oleh admin
// digunakan ketika user lupa password
router.put("/users/:id/reset-password", verifyToken, async (req, res) => {
  const { newPassword } = req.body;
  const id = req.params.id;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Hanya admin yang bisa mereset password" });
  }

  try {
    const user = await db.user.findByPk(id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password user berhasil di-reset oleh admin" });
  } catch (error) {
    res.status(500).json({ message: "Gagal reset password", error });
  }
});



module.exports = router;
