// Bertanggung jawab untuk menghubungkan aplikasi dengan database.
// Menggunakan Sequelize sebagai ORM untuk mengelola database PostgreSQL.

// impor sequelize dari package untuk mengelola database
const { Sequelize } = require("sequelize");

// impor konfigurasi database dari file db.config.js
const dbConfig = require("../config/db.config");

// membuat instance Sequelize untuk koneksi ke database
const sequelize = new Sequelize(
  dbConfig.DB,          // Nama database
  dbConfig.USER,        // Username database
  dbConfig.PASSWORD,    // Password database
  {
    host: dbConfig.HOST,     // Host database (localhost)
    dialect: dbConfig.dialect, // Dialek database (postgres)
    port: dbConfig.PORT,     // Port database (5432 untuk PostgreSQL)
    pool: dbConfig.pool,     // Konfigurasi koneksi pooling
    logging: false           // Menonaktifkan logging query SQL di console
  }
);

// membuat objek `db` untuk menyimpan model-model yang digunakan
const db = {};

// menyimpan objek Sequelize agar bisa digunakan di file lain
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// impor model `User` dan `Biodata`, lalu memasukkannya ke dalam objek `db`
db.user = require("./user.model")(sequelize, Sequelize);
db.biodata = require("./biodata.model")(sequelize, Sequelize);

// expor agar bisa digunakan di file lain
module.exports = db;
