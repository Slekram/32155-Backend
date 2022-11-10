const {Router} = require("express");
const rutaCarrito = Router();
const {contenedorCarrito} = require("../main");

rutaCarrito.post("/", async(req, res)=> {
    const data = req.body;
    if (!data.producto||!data.id||!data.unidades){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    await contenedorCarrito.crearCarrito(data);
    res.json({
        msg: "carrito creado",
    });
})

rutaCarrito.delete("/:id", async(req, res)=> {
    const id = req.params.id;
    await contenedorCarrito.deleteById(id);
    res.json({
        msg: "ok"
    })
})

rutaCarrito.get("/:id/productos", async (req, res)=> {
    const id = req.params.id;
    const carrito = await contenedorCarrito.getById(id).then((data)=>{
        return data;
    });
    res.json({
        data: carrito,
    });
})

rutaCarrito.post("/:id/productos", async (req, res)=> {
    const data = req.body;
    const id = req.params.id;
    if (!data.producto||!data.id||!data.unidades){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    await contenedorCarrito.agregarCarrito(data,id);
    res.json({
        msg: `Producto agregado al carrito de id: ${id}`
    });
})

rutaCarrito.delete("/:id/productos/:id_prod", async (req, res)=> {
    const id = req.params.id;
    const id2 = req.params.id_prod;
    await contenedorCarrito.eliminarCarrito(id, id2);
    res.json({
        msg: "ok"
    })
})

module.exports = rutaCarrito;