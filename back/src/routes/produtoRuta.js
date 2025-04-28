const { Router } = require("express")

const createProducto = require("../controller/newProducto")
const editProducto = require("../controller/editProduto")
const getProducto = require("../controller/getProduto")

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


router.post("/ingresarProducto", async (req, res) => {
    try {
        const data = req.body;
        const result = await createProducto(data);

        return res.status(201).json({ newProduct: result.newProduct })
    } catch (error) {
        console.error("error al crea producto", error.message)
        return res.status(500).json({ error: "Error interno del servidor" });

    }
})


router.patch("/actualizarProducto/:id", async (req, res) => {
    try {
        await editProducto(req.params.id, req.cantidadNueva)
        res.status(200).json();
    } catch (error) {
        console.error("error al cambiar;", error)
        res.status(500).json({ error: "error al cambiar el producto" })
    }
})







module.exports = router;