const {Router} = require("express");
const rutaCarrito = Router();
//const {contenedorCarrito} = require("../main");
const {carritoModel} = require("../services/mongoose/main");

rutaCarrito.post("/", async(req, res)=> {
    const data = req.body;
    if (!data.producto||!data.idcomprador||!data.unidades){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    await carritoModel.crearCarrito(data);
    res.json({
        msg: "carrito creado",
    });
})

rutaCarrito.delete("/:idcomprador", async(req, res)=> {
    const id = req.params.idcomprador;
    await carritoModel.deleteById(id);
    res.json({
        msg: "ok"
    })
})

rutaCarrito.get("/:idcomprador/productos", async (req, res)=> {
    const id = req.params.idcomprador;
    const carrito = await carritoModel.getById(id).then((data)=>{
        return data;
    });
    res.json({
        data: carrito,
    });
})

rutaCarrito.post("/:idcomprador/productos", async (req, res)=> {
    const data = req.body;
    const id = req.params.idcomprador;
    if (!data.producto||!data.unidades){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    await carritoModel.agregarCarrito(data,id);
    res.json({
        msg: `Producto agregado al carrito de id: ${id}`
    });
})

rutaCarrito.delete("/:idcomprador/productos/:id_prod", async (req, res)=> {
    const id = req.params.id_prod;
    await carritoModel.eliminarCarrito(id);
    res.json({
        msg: "ok"
    })
})

module.exports = rutaCarrito;