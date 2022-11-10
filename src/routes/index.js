const {Router} = require("express");

const ProductosRouter = require("./productos");
const CarritoRouter = require("./carrito");
const rutaPrincipal = Router();

rutaPrincipal.use("/productos", ProductosRouter);
rutaPrincipal.use("/carrito", CarritoRouter);
module.exports = rutaPrincipal;