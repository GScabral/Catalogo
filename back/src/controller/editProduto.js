const { productos: Producto } = require('../db')





const actualizarProducto = async (id, data) => {
    const { nombre, precio, descripcion, imagen_url, cantidad } = data;


    const producto = await Producto.findByPk(id);

    // Actualiza solo los campos enviados
    if (nombre !== undefined) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;
    if (cantidad !== undefined) producto.cantidad = cantidad;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (imagen_url !== undefined) producto.imagen_url = imagen_url;

    await producto.save();

    return producto;

} 


module.exports= actualizarProducto;