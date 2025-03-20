// routes/user.routes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const db = require("../models");

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

module.exports = router;
