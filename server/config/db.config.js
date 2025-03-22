// Memuat variabel lingkungan dari file .env agar bisa digunakan dalam kode
require("dotenv").config();

// Mengekspor konfigurasi database agar bisa digunakan di file lain
module.exports = {
  // Mengambil nilai host database dari variabel lingkungan (.env)
  HOST: process.env.DB_HOST,

  // Mengambil username database dari .env
  USER: process.env.DB_USER,

  // Mengambil password database dari .env
  PASSWORD: process.env.DB_PASS,

  // Mengambil nama database dari .env
  DB: process.env.DB_NAME,
  // Menentukan jenis database yang digunakan (dalam hal ini PostgreSQL)
  dialect: "postgres",

  // Mengambil port database dari variabel lingkungan
  PORT: process.env.DB_PORT,

  // Konfigurasi pooling database (pengaturan koneksi yang digunakan kembali)
  pool: {
    // Maksimum koneksi dalam pool
    max: 5,

    // Minimum koneksi dalam pool
    min: 0,

    // Waktu maksimal (dalam ms) untuk mendapatkan koneksi sebelum timeout
    acquire: 30000,

    // Waktu idle maksimal (dalam ms) sebelum koneksi dilepaskan
    idle: 10000,
  },
};

// pool membantu mengelola koneksi ke database agar lebih efisien dan menghindari membuka terlalu banyak koneksi yang tidak diperlukan
