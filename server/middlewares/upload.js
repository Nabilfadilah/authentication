// impor library multer untuk menangani upload file
const multer = require("multer");

// mengatur penyimpanan file di memori (buffer), bukan di sistem file
const storage = multer.memoryStorage(); 

// menginisialisasi middleware multer dengan konfigurasi penyimpanan di memori
const upload = multer({ storage });

module.exports = upload;

// penjelasan:
// multer adalah middleware untuk menangani upload file di Node.js.

// multer.memoryStorage() menyimpan file yang diupload langsung di memori (buffer), bukan di dalam folder di server.

// Biasanya digunakan jika ingin menyimpan file langsung ke database atau layanan penyimpanan cloud seperti AWS S3, Google Cloud Storage, Firebase Storage, dll.

// multer({ storage }) membuat instance middleware upload yang bisa digunakan dalam route untuk menangani file yang diupload.