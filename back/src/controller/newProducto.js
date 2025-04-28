const  {productos:Producto}=require('../db')



const createProducto= async(data)=>{
    try{
        const { nombre, descripcion, precio, cantidad, imagen_url } = data; // CORREGIDO: también cantidad e imagen_url



    const  newProduct=await Producto.create({
        nombre,
        descripcion,
        precio,
        cantidad,
        imagen_url,
    })

    return {newProduct};
    }catch(error){
        console.error("Error interno en createNewProduct:", error.message);
        throw error; // Lanza el error para que lo capture la ruta
    }
}


module.exports = createProducto