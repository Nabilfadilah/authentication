const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/authMiddleware");

const {
  createBiodata,
  getAllBiodata,
  getBiodataById,
  updateBiodata,
  deleteBiodata
} = require("../controllers/biodataController");

// route untuk menambah biodata
router.post("/", verifyToken, upload.single("photo"), createBiodata);

// route untuk mendapatkan semua biodata
router.get("/", verifyToken, getAllBiodata);

// route untuk melihat detail biodata by id
router.get("/:id", verifyToken, getBiodataById);

// route untuk memperbarui data biodata
router.put("/:id", verifyToken, upload.single("photo"), updateBiodata);

// route untuk menghapus biodata
router.delete("/:id", verifyToken, deleteBiodata);

module.exports = router;
