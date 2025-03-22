const express = require("express");
const router = express.Router();
const db = require("../models");
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/authMiddleware");

// create biodata
router.post("/", verifyToken, upload.single("photo"), async (req, res) => {
  try {
    const {name, email, phone, address} = req.body;
    const photo = req.file ? req.file.buffer : null;

    const newData = await db.biodata.create({
      name,
      email,
      phone,
      address,
      photo,
      userId: req.user.id,
    });
    res.status(201).json({message: "Biodata berhasil dibuat", data: newData});
  } catch (err) {
    res.status(500).json({message: "Gagal membuat biodata", error: err});
  }
});

// read/get all semua biodata
router.get("/", verifyToken, async (req, res) => {
  try {
    const whereCondition =
      req.user.role === "admin" ? {} : {userId: req.user.id};

    const data = await db.biodata.findAll({where: whereCondition});

    const formattedData = data.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      phone: item.phone,
      photo: item.photo
        ? `data:image/jpeg;base64,${item.photo.toString("base64")}`
        : null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({message: "Gagal mengambil data", error: err});
  }
});

// read detail biodata by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const item = await db.biodata.findByPk(req.params.id);
    if (!item) return res.status(404).json({message: "Data tidak ditemukan"});

    // hanya pemilik data atau admin
    if (req.user.role !== "admin" && item.userId !== req.user.id) {
        return res.status(403).json({ message: "Akses ditolak" });
    }

    const formattedItem = {
      id: item.id,
      name: item.name,
      address: item.address,
      phone: item.phone,
      photo: item.photo
        ? `data:image/jpeg;base64,${item.photo.toString("base64")}`
        : null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    res.json(formattedItem);
  } catch (err) {
    res.status(500).json({message: "Gagal mengambil detail data", error: err});
  }
});

// update biodata
router.put("/:id", verifyToken, upload.single("photo"), async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;
      const photo = req.file ? req.file.buffer : null;
  
      const biodata = await db.biodata.findByPk(req.params.id);
      if (!biodata) return res.status(404).json({ message: "Data tidak ditemukan" });
  
      // hanya pemilik data atau admin
      if (req.user.role !== "admin" && biodata.userId !== req.user.id) {
        return res.status(403).json({ message: "Akses ditolak" });
      }
  
      biodata.name = name ?? biodata.name;
      biodata.email = email ?? biodata.email;
      biodata.address = address ?? biodata.address;
      biodata.phone = phone ?? biodata.phone;
      if (photo) biodata.photo = photo;
  
      await biodata.save();
      res.status(201).json({ message: "Biodata berhasil diupdate", biodata });
    } catch (err) {
      res.status(500).json({ message: "Gagal update data", error: err });
    }
});
  
// delete biodata
router.delete("/:id", verifyToken, async (req, res) => {
    try {
      const biodata = await db.biodata.findByPk(req.params.id);
      if (!biodata) return res.status(404).json({ message: "Data tidak ditemukan" });
  
      // hanya pemilik data atau admin
      if (req.user.role !== "admin" && biodata.userId !== req.user.id) {
        return res.status(403).json({ message: "Akses ditolak" });
      }
  
      await biodata.destroy();
      res.json({ message: "Biodata berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ message: "Gagal hapus data", error: err });
    }
});
  
module.exports = router;
