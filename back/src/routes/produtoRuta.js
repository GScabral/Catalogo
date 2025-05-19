const { Router } = require("express")

const createProducto = require("../controller/newProducto")
const editProducto = require("../controller/editProduto")
const getProducto = require("../controller/getProduto")
const deleteProducto=require("../controller/deleteProducto")
const upload = require("../upload.js")

const router = Router();

router.get("/listaProducto", async (req, res) => {
    try {
        const productos = await getProducto()

        if (productos.error) {
            return res.status(500).json({ error: productos.error })
        }
        res.status(200).json(productos)
    } catch (error) {
        console.error("error inesperado:", error.message);
        res.status(500).json({ error: "error interno del servidor" })
    }
})


// Aquí le dices que primero pase por multer para procesar la imagen
router.post("/ingresarProducto", upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad ,categoria} = req.body;
        const imagen_url = req.file ? req.file.path : null; // Aquí req.file.path trae la URL pública de Cloudinary

        const data = { nombre, descripcion, precio, cantidad,categoria, imagen_url };

        const result = await createProducto(data);

        return res.status(201).json({ newProduct: result });
    } catch (error) {
        console.error("error al crear producto:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});



router.patch("/actualizarProducto/:id", upload.single('imagen'), async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        // Si hay archivo, pásalo también al controller
        const file = req.file;

        const productoActualizado = await editProducto(id, data, file);
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error("error al cambiar;", error)
        res.status(500).json({ error: "error al cambiar el producto" })
    }
});


router.delete("/eliminarProducto/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const productoEliminado=await deleteProducto(id)
        res.status(200).json(productoEliminado)
    }catch(error){
        console.error("error al eliminar producto:",error.message)
        res.status(500).json({error:"error interno del servidor "})
    }
})







module.exports = router;