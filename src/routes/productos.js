const {Router} = require("express");
const sql = require("../services/sql");

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
    const productos = await sql.getAllProducts().then((data)=>{
        return data;
    })
    res.json({
        data: productos,
    })
})

rutaProductos.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const productos = await sql.getProductsById(id).then((data)=>{
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
    await sql.insertProducts(data);
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
    const dataActualizada = await sql.updateProduct(id, data);
    res.json({
        msg: "ok",
        data: dataActualizada,
    })
})

rutaProductos.delete("/:id", autorizacion, async (req,res)=>{
    const id = req.params.id;
    console.log(req.params);
    await sql.deleteProductById(id);
    res.json({
        msg: "ok"
    })
})

module.exports = rutaProductos;