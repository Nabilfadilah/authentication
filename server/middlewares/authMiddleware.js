// Middleware untuk verifikasi token JWT
// hanya user yang sudah login (memiliki token valid) yang bisa mengakses endpoint tertentu (misalnya halaman dashboard, profile user, dsb).

// impor library jsonwebtoken untuk menangani token JWT
const jwt = require("jsonwebtoken");

// verifikasi token untuk user yang sudah login
const verifyToken = (req, res, next) => {

  // mengambil token dari header Authorization (format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // jika ada, ambil tokennya saja

  // jika token tidak ditemukan, kembalikan status 403 (Forbidden)
  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  // verifikasi token menggunakan secret key yang ada di environment variable
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
    // jika token tidak valid atau sudah kedaluwarsa, kembalikan status 401 (Unauthorized)
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    
    // jika token valid, simpan data user yang telah didekode ke dalam `req.user`
    req.user = decoded; // simpan data user ke request
    
    // lanjut ke middleware berikutnya atau ke route handler
    next();
  });
};

module.exports = verifyToken;
