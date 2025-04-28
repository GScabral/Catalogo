const  {productos:Producto}=require('../db')



const getProductos=async()=>{
    const Productos=await Producto.findAll();
    return Productos;
}


module.exports = getProductos;