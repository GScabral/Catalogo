module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('productos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        precio: {
            type: DataTypes.NUMERIC
        },
       
        descripcion: {
            type: DataTypes.TEXT
        },
        imagen_url: {
            type: DataTypes.STRING(255)
        }
    }, {
        tableName: 'productos',
        timestamps: false
    });

    return Producto;
};
