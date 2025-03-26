const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/authMiddleware");

const {
  createBiodata,
  getAllBiodata,
  getBiodataById,
  updateBiodata,
  deleteBiodata,
} = require("../controllers/biodataController");

// route untuk menambah biodata (user hanya bisa membuat 1 biodata)
router.post("/biodata/create", verifyToken, upload.single("photo"), createBiodata);

// route untuk mendapatkan semua biodata (admin bisa melihat semua)
router.get("/biodata", verifyToken, getAllBiodata);

// route untuk mendapatkan biodata berdasarkan ID
router.get("/biodata/:id", verifyToken, getBiodataById);

// route untuk memperbarui biodata
router.put("/biodata/edit/:id", verifyToken, upload.single("photo"), updateBiodata);

// route untuk menghapus biodata
router.delete("/biodata/:id", verifyToken, deleteBiodata);

module.exports = router;
