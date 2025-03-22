// middleware untuk membatasi akses hanya untuk admin
const isAdmin = (req, res, next) => {
  // mengecek apakah peran (role) user bukan "admin"
  if (req.user.role !== "admin") {
    return res.status(403).json({message: "Akses hanya untuk admin"});
  }

  // jika user adalah admin, lanjutkan ke middleware atau route handler berikutnya
  next();
};

module.exports = isAdmin;
