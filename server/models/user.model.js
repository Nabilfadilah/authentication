// Model ini merepresentasikan tabel user di database

module.exports = (sequelize, DataTypes) => {
  // mendefinisikan model 'User' dengan nama tabel 'user'
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER, // tipe data integer
      autoIncrement: true,     // ID akan bertambah otomatis
      primaryKey: true         // menjadikan ID sebagai primary key
    },
    name: {
      type: DataTypes.STRING    // nama pengguna (string)
    },
    email: {
      type: DataTypes.STRING,   // email pengguna (string)
      unique: true,             // email harus unik
      allowNull: false          // tidak boleh kosong
    },
    role: {
      type: DataTypes.STRING,   // peran pengguna (admin/user)
      allowNull: false,         // tidak boleh kosong
      defaultValue: 'user'      // secara default adalah 'user'
    },   
    password: {
      type: DataTypes.STRING,   // password pengguna (string)
      allowNull: false          // tidak boleh kosong
    }
  });

  return User;
};
