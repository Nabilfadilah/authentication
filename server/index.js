const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user.routes');
const biodataRoutes = require("./routes/biodata.routes");

app.use(cors());
app.use(express.json());

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
app.use("/api/biodata", biodataRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
