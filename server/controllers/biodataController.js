const db = require("../models"); // Mengimpor model database

// Create biodata
const createBiodata = async (req, res) => {
  try {
    console.log("File yang diterima:", req.file);
    console.log("Data yang diterima:", req.body);

    // Cek apakah user sudah memiliki biodata
    const existing = await db.biodata.findOne({ where: { userId: req.user.id } });
    if (existing) {
      return res.status(400).json({ message: "Anda sudah memiliki biodata" });
    }

    // Ambil data dari request body
    const { name, email, phone, address } = req.body;
    const photo = req.file ? req.file.buffer : null;

    // Membuat biodata baru di database
    const newData = await db.biodata.create({
      name,
      email,
      phone,
      address,
      photo,
      userId: req.user.id, // Menghubungkan dengan user yang membuat
    });

    res.status(201).json({ message: "Biodata berhasil dibuat", data: newData });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat biodata", error: err });
  }
};

// Get all biodata (admin bisa melihat semua, user hanya miliknya)
const getAllBiodata = async (req, res) => {
  try {
    // Jika user adalah admin, ambil semua data. Jika bukan, hanya ambil data miliknya.
    if (req.user.role === "admin") {
      const data = await db.biodata.findAll();

      // Format data sebelum dikirim ke client
      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        address: item.address,
        phone: item.phone,
        photo: item.photo
          ? `data:image/jpeg;base64,${item.photo.toString("base64")}`
          : null,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      return res.json(formattedData);
    } else {
      // User biasa hanya lihat biodata miliknya
      const item = await db.biodata.findOne({ where: { userId: req.user.id } });
      if (!item) return res.json(null); // belum ada biodata

      // Format data sebelum dikirim ke client
      const formattedItem = {
        id: item.id,
        name: item.name,
        email: item.email,
        address: item.address,
        phone: item.phone,
        photo: item.photo
          ? `data:image/jpeg;base64,${item.photo.toString("base64")}`
          : null,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };

      return res.json(formattedItem);
    }
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data", error: err });
  }
};

// Get biodata by ID
const getBiodataById = async (req, res) => {
  try {
    const item = await db.biodata.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Hanya pemilik data atau admin yang bisa mengakses
    if (req.user.role !== "admin" && item.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    // Format data sebelum dikirim ke client
    const formattedItem = {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      photo: item.photo ? `data:image/jpeg;base64,${item.photo.toString("base64")}` : null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    res.json(formattedItem);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil detail data", error: err });
  }
};

// Update biodata
const updateBiodata = async (req, res) => {
  try {
    // Mengambil data dari request body
    const { name, email, phone, address } = req.body;
    const photo = req.file ? req.file.buffer : null;

    // Cari data berdasarkan ID
    const biodata = await db.biodata.findByPk(req.params.id);
    if (!biodata) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Hanya pemilik data atau admin yang bisa mengupdate
    if (req.user.role !== "admin" && biodata.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    // Update data hanya jika ada perubahan
    biodata.name = name ?? biodata.name;
    biodata.email = email ?? biodata.email;
    biodata.address = address ?? biodata.address;
    biodata.phone = phone ?? biodata.phone;
    if (photo) biodata.photo = photo;

    await biodata.save(); // Simpan perubahan ke database
    res.status(201).json({ message: "Biodata berhasil diupdate", biodata });
  } catch (err) {
    res.status(500).json({ message: "Gagal update data", error: err });
  }
};

// Delete biodata
const deleteBiodata = async (req, res) => {
  try {
    // Cari data berdasarkan ID
    const biodata = await db.biodata.findByPk(req.params.id);
    if (!biodata) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Hanya pemilik data atau admin yang bisa menghapus
    if (req.user.role !== "admin" && biodata.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    await biodata.destroy(); // Hapus data dari database
    res.json({ message: "Biodata berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus data", error: err });
  }
};

// Ekspor semua fungsi agar bisa digunakan di file routes
module.exports = { createBiodata, getAllBiodata, getBiodataById, updateBiodata, deleteBiodata };
