// hanya user yang sudah login (memiliki token valid) yang bisa mengakses endpoint tertentu (misalnya halaman dashboard, profile user, dsb).
const jwt = require("jsonwebtoken");

// verifikasi token untuk user yang sudah login
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    
    req.user = decoded; // simpan data user ke request
    next();
  });
};

module.exports = verifyToken;
