const {Router} = require("express");
const rutaTest = Router();

const { faker } = require('@faker-js/faker');

let productosRandom = [];

const crearProductoRandom = async () => {

    productosRandom = [];
    
    for (let i= 1; i <= 5; i++){
        const nuevoProducto = {
            producto: faker.commerce.product(),
            precio: faker.commerce.price(100,10000)
        }
        productosRandom.push(nuevoProducto);
    }
    
    return productosRandom;
}


rutaTest.get("/", async (req, res) =>{
        const productos = await  crearProductoRandom().then((data)=>{
            return data;
        })
        res.json({
            data: productos,
        })
    }
)

module.exports = rutaTest;