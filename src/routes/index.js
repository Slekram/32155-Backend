const {Router} = require("express");

const ProductosRouter = require("./productos");
const CarritoRouter = require("./carrito");
const TestRouter = require("./productosTest");

const rutaPrincipal = Router();

rutaPrincipal.use("/productos", ProductosRouter);
rutaPrincipal.use("/carrito", CarritoRouter);
rutaPrincipal.use("/productos-test", TestRouter);
module.exports = rutaPrincipal;