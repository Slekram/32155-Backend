const {Router} = require("express");

const ProductosRouter = require("./productos");
const CarritoRouter = require("./carrito");
const TestRouter = require("./productosTest");
const UsuariosRouter = require("./user.routes");
const rutaPrincipal = Router();

rutaPrincipal.use("/productos", ProductosRouter);
rutaPrincipal.use("/carrito", CarritoRouter);
rutaPrincipal.use("/productos-test", TestRouter);
rutaPrincipal.use("/usuarios", UsuariosRouter);
module.exports = rutaPrincipal;