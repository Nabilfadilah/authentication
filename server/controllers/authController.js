const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user; // <--- akses dari index.js, bukan langsung dari user.model.js

const register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Cek apakah email sudah terdaftar
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Simpan user baru
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });
  
      return res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Gagal register', error });
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login berhasil', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error });
  }
};

module.exports = { register, login };
