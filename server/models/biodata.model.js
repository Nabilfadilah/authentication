// Model ini merepresentasikan tabel biodata di database.

module.exports = (sequelize, DataTypes) => { 
    // mendefinisikan model 'Biodata' dengan nama tabel 'biodata'
    const Biodata = sequelize.define("biodata", {
        name: {
            type: DataTypes.STRING,  // nama pengguna
            allowNull: false         // tidak boleh kosong
        },
        email: {
            type: DataTypes.STRING,  // email pengguna
            unique: true,            // email harus unik
            allowNull: false         // tidak boleh kosong
        },
        phone: {
            type: DataTypes.STRING,  // nomor telepon pengguna
            allowNull: false         // tidak boleh kosong
        },
        address: {
            type: DataTypes.STRING,  // alamat pengguna
            allowNull: false         // tidak boleh kosong
        },
        photo: {
            type: DataTypes.BLOB("long") // tipe data BLOB untuk menyimpan gambar
        },
        userId: DataTypes.INTEGER // menyimpan ID user untuk relasi ke tabel `user`
    });

    return Biodata;
}