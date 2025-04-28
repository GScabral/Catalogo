const  {productos:Producto}=require('../db')



const createProducto= async(bodyData)=>{
    try{
        const {nombre,precio,descripcion,}=bodyData;
        const imagen_url = req.file?req.file.path : null



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