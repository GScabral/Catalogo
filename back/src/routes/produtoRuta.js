const { Router } = require("express")

const createProducto = require("../controller/newProducto")
const editProducto = require("../controller/editProduto")
const getProducto = require("../controller/getProduto")
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
        const { nombre, descripcion, precio, cantidad } = req.body;
        const imagen_url = req.file ? req.file.path : null;

        const data = { nombre, descripcion, precio, cantidad, imagen_url };

        const result = await createProducto(data);

        return res.status(201).json({ newProduct: result });
    } catch (error) {
        console.error("error al crear producto:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});



router.patch("/actualizarProducto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const productoActualizado = await editProducto(id, data)
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error("error al cambiar;", error)
        res.status(500).json({ error: "error al cambiar el producto" })
    }
})







module.exports = router;