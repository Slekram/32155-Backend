const {Router} = require("express");

const {contenedor1} = require("../main");

const rutaProductos = Router();

let admin = true;

const autorizacion = (req, res, next) =>{
    if (!admin){
        return res.status(401).json({
            msg: "No estas autorizado",
        })
    }

    next();

}

rutaProductos.get("/", async (req, res) =>{
    const productos = await contenedor1.getAll().then((data)=>{
        return data;
    })
    res.json({
        data: productos,
    })
})

rutaProductos.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const productos = await contenedor1.getById(id).then((data)=>{
        return data;
    });
    console.log(productos);
    res.json({
        data: productos,
    })
})

rutaProductos.post("/", autorizacion, async (req,res)=>{
    
    const data = req.body;
    if (!data.producto||!data.precio){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    await contenedor1.save(data);
    res.redirect("/");
})

rutaProductos.put("/:id", autorizacion, async (req,res)=>{
    const id = req.params.id;
    console.log(req.params);
    const data = req.body;
    if (!data.producto||!data.precio){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    const dataActualizada = await contenedor1.actualizar(data, id);
    res.json({
        msg: "ok",
        data: dataActualizada,
    })
})

rutaProductos.delete("/:id", autorizacion, async (req,res)=>{
    
    const id = req.params.id;
    console.log(req.params);
    await contenedor1.deleteById(id);
    res.json({
        msg: "ok"
    })
})

module.exports = rutaProductos;