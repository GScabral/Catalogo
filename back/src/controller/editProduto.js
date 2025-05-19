const { productos: Producto } = require('../db')


const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const actualizarProducto = async (id, data, file) => {
    if (!data) throw new Error('No se enviaron datos para actualizar');

    const { nombre, precio, descripcion, cantidad, categoria } = data;

    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error('Producto no encontrado');

    // Si hay archivo, súbelo a Cloudinary
    let imagen_url = data.imagen_url;
    if (file) {
        const result = await cloudinary.uploader.upload(file.path);
        imagen_url = result.secure_url;
    }

    // Actualiza solo los campos enviados
    if (nombre !== undefined) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;
    if (categoria !== undefined) producto.categoria = categoria;
    if (cantidad !== undefined) producto.cantidad = cantidad;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (imagen_url !== undefined) producto.imagen_url = imagen_url;

    await producto.save();

    return producto;
};

module.exports = actualizarProducto;


