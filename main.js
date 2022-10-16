const fs = require("fs");

const express= require("express");

const app = express();

const puerto = 8080;

const server = app.listen(puerto, ()=>{
    console.log(`Servidor HTTP escuchando en el puerto ${puerto}`);
});

const leerArchivo = async () => {
    const data = await fs.promises.readFile(nombreArchivo, "utf-8");
    return JSON.parse(data);
}

const guardarArchivo= async (producto) => {
    const data = JSON.stringify(producto, null, "\t");
    await fs.promises.writeFile(nombreArchivo, data)
}

class Contenedor {
    contructor (nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    getAll = async () => {
        const productos = await leerArchivo()
        return productos
    }

    getById = async (id) => {
        const productos = await leerArchivo()
        const indice = productos.findIndex((producto => producto.id === id));
        if(indice < 0) {
            throw new Error ("El producto no existe")
        }
        return productos[indice]
    }

    save = async (data) => {
        const productos = await leerArchivo();
        const producto = {
            producto: data.producto,
            precio: data.precio,
            id: productos[productos.length - 1].id + 1
        }

        productos.push(producto);
        guardarArchivo(productos);
    }

    deleteById= async (id) =>{
        const productos = await leerArchivo();
        const indice = productos.findIndex((producto => producto.id === id));
        if(indice < 0) {
            throw new Error ("El producto no existe")
        }
        productos.splice(indice, 1);
        guardarArchivo(productos);
    }
    
    deleteAll = async () =>{
        await guardarArchivo([])
    }

}



const nombreArchivo = "archivo.json";

const contenedor1 = new Contenedor(nombreArchivo);

app.get("/productos", async (req, res) =>{
    const productos = await contenedor1.getAll().then((data)=>{
        return data;
    })
    res.json({
        data: productos,
    })
})

app.get("/productoRandom", async (req, res) =>{
    const productos = await contenedor1.getAll().then((data)=>{
        return data;
    })
    const between = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    const indice = between(0, productos.length)
    const productoRandom = productos[indice];
    res.json({
        data: productoRandom,
    })
})





