const {Router} = require("express");

//const sql = require("../services/sql");

// async function test(){
//     await sql.createTable();
//     console.log("Table creada");
//     await sql.insertProducts(products);
//     console.log("Producto insertado");
//     const allProducts = await sql.getAllProducts();
//     console.table(allProducts);
//     await sql.deleteProductById(6);
//     console.log("producto eliminado");
// }

//const {contenedor1} = require("../main");

const {productosModel} = require("../services/mongoose/main");

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
    const productos = await  productosModel.getAll().then((data)=>{
        return data;
    })
    res.json({
        data: productos,
    })
})

rutaProductos.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const productos = await productosModel.getById(id).then((data)=>{
        return data;
    });
    res.json({
        data: productos,
    });
})

rutaProductos.post("/", autorizacion, async (req,res)=>{
    
    const data = req.body;
    if (!data.producto||!data.precio||!data.stock){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    await productosModel.createProducts(data);
    res.redirect("/");
})

rutaProductos.put("/:id", autorizacion, async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    if (!data.producto||!data.precio||!data.stock){
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }
    const dataActualizada = await productosModel.actualizar(id, data);
    res.json({
        msg: "ok",
        data: dataActualizada,
    })
})

rutaProductos.delete("/:id", autorizacion, async (req,res)=>{
    const id = req.params.id;
    await productosModel.deleteById(id);
    res.json({
        msg: "ok"
    })
})

module.exports = rutaProductos;