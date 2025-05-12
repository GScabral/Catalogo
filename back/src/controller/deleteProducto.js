const { productos: Producto } = require('../db')



const deleteProducto=async (id)=>{
    if (!id) throw new Error('No se id invalido o no proporcionado')

    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error('Producto no encontrado');
    await producto.destroy();
    return producto;
}



module.exports= deleteProducto;