module.exports = (sequelize, DataTypes) => { 
    const Biodata = sequelize.define("biodata", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB("long") // untuk simpan image di PostgreSQL
        },
        userId: DataTypes.INTEGER // menyimpan id user
    });

    return Biodata;
}