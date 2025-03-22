const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// impor database dari models/index.js (bukan langsung dari user.model.js)
const db = require('../models');
const User = db.user; // <--- akses dari index.js, bukan langsung dari user.model.js

// controller untuk registrasi user baru
const register = async (req, res) => {
    // Mengambil data dari request body
    const { name, email, role, password } = req.body;
  
    try {
      // cek apakah email sudah terdaftar didatabase
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }
  
      // Hash password sebelum disimpan ke database (menggunakan 10 salt rounds)
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Simpan user baru ke database
      const newUser = await User.create({
        name,
        email,
        role: role || 'user', // kalau tidak dikirim, default 'user'
        password: hashedPassword // simpan password yang sudah di-hash
      });
  
      // mengembalikan respons sukses
      return res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Gagal register', error });
    }
  };

// controller untuk login user
const login = async (req, res) => {
  // mengambil email dan password dari request body
  const { email, password } = req.body;
  try {
    // mencari user berdasarkan email di database
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    // membandingkan password yang dikirim dengan password yang tersimpan di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    // jika login berhasil, buat token JWT yang berisi informasi user
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET, // menggunakan secret key dari environment variable
      { expiresIn: '1h' }); // Token berlaku selama 1 jam 
    
      // mengembalikan response sukses login dengan token
      res.status(200).json({ message: 'Login berhasil', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error });
  }
};

module.exports = { register, login };
