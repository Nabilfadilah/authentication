const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user.routes');
const biodataRoutes = require("./routes/biodata.routes");

// cors untuk menghubungkan ke frontend
app.use(cors({
  origin: 'http://localhost:5173', // BUKAN '*', harus spesifik
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const db = require("./models");

// Auto sinkronisasi model → akan otomatis membuat tabel jika belum ada
db.sequelize.sync({ alter: true }) // alter = update struktur tabel jika berubah
  .then(() => {
    console.log("Database & tabel tersinkronisasi.");
  })
  .catch((err) => {
    console.error("Gagal sinkronisasi database:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Backend berjalan dengan Sequelize + PostgreSQL");
});
app.use('/api', authRoutes); // login dan register
app.use('/api', userRoutes); // profile
app.use("/api", biodataRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
