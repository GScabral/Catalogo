const { Router } = require("express")
const productoRuta=require("./produtoRuta")

const router = Router();

router.use("/productos",productoRuta)



module.exports = router;