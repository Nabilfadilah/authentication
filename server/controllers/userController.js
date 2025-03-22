const db = require("../models");
const bcrypt = require("bcryptjs"); // untuk hashing password

// mendapatkan profile user berdasarkan token yang dikirim 
const getUserProfile = async (req, res) => {
    try {
        // mencari user berdasarkan ID yang ada di token
        const user = await db.user.findByPk(req.user.id, {
          attributes: ["id", "name", "email"] // hanya mengambil atribut tertentu
        });
        res.json({ user }); // mengembalikan data user dalam format JSON
      } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data user", error });
    }
}

// mendapatkan semua user (hanya bisa diakses oleh admin)
const getAllUsers = async (req, res) => {
    try {
        // mengambil semua user dengan atribut tertentu
        const users = await db.user.findAll({ attributes: ['id', 'name', 'email', 'role'] });
        res.json({ users }); // mengembalikan daftar user dalam format JSON
      } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data users", error: err });
    }
}

// memperbarui data user (hanya admin atau user itu sendiri) jika admin, bisa update siapa saja
const updateUser = async (req, res) => {
    const { name, email, password, role, oldPassword } = req.body; // mengambil data dari request body
      const id = req.params.id; // mengambil ID user dari parameter URL
    
      try {
        // memeriksa apakah user memiliki hak akses untuk mengubah data
        // Cek hak akses hanya admin yang bisa rubah datanya sendiri
        // dan user berdasarkan id nya sendiri
        if (req.user.role !== "admin" && req.user.id != id) {
          return res.status(403).json({ message: "Akses ditolak" });
        }
    
        // mencari user berdasarkan ID
        const user = await db.user.findByPk(id);
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    
        // jika user ingin mengganti password
        if (password) {
    
          // Jika password ingin diganti oleh user biasa → wajib masukkan oldPassword
          if (req.user.role !== "admin") {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: "Password lama salah" });
          }
    
          // mengenkripsi/hash password baru
          user.password = await bcrypt.hash(password, 10);
        }
    
        // memperbarui data user dengan data yang dikirim, jika tidak ada data baru maka tetap menggunakan data lama
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        // hanya admin yang bisa mengubah role user lain
        user.role = req.user.role === "admin" ? (role ?? user.role) : user.role;
    
        // menyimpan perubahan ke database
        await user.save();
        res.json({ message: "User berhasil diperbarui", user });
      } catch (error) {
        res.status(500).json({ message: "Gagal update user", error });
    }
}

// menghapus user (hanya admin yang bisa melakukan)
// Kalau token bukan admin → akan ditolak.
const deleteUser = async (req, res) => {
    // Kalau admin → user akan dihapus dari database.
    // jika user bukan admin, tolak akses
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Hanya admin yang bisa menghapus user" });
      }
    
      try {
        // mencari user berdasarkan ID
        const user = await db.user.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    
        // menghapus user dari database
        await user.destroy();
        res.json({ message: "User berhasil dihapus" });
      } catch (error) {
        res.status(500).json({ message: "Gagal menghapus user", error });
    }
}

// Reset password user oleh admin, digunakan ketika user lupa password
const resetUserPassword = async (req, res) => {
    const { newPassword } = req.body; // mengambil password baru dari request body
      const id = req.params.id; // mengambil ID user dari parameter URL
    
      // hanya admin yang bisa mereset password user lain
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Hanya admin yang bisa mereset password" });
      }
    
      try {
        // mencari user berdasarkan ID
        const user = await db.user.findByPk(id);
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    
        // mengenkripsi password baru
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
    
        res.json({ message: "Password user berhasil di-reset oleh admin" });
      } catch (error) {
        res.status(500).json({ message: "Gagal reset password", error });
    }
}

module.exports = { getUserProfile, getAllUsers,updateUser, deleteUser, resetUserPassword };
