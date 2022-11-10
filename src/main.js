const fs = require("fs");

const leerArchivo = async (nombreArchivo) => {
    const data = await fs.promises.readFile(nombreArchivo, "utf-8");
    return JSON.parse(data);
}

const guardarArchivo= async (producto, nombreArchivo) => {
    const data = JSON.stringify(producto, null, "\t");
    await fs.promises.writeFile(nombreArchivo, data)
}

class ContenedorProductos {
    contructor (nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    getAll = async () => {
        const productos = await leerArchivo(nombreArchivoProductos);
        return productos;
    }

    getById = async (id) => {
        const productos = await leerArchivo(nombreArchivoProductos);
        const indice = productos.findIndex((producto => producto.id == id));
        if(indice < 0) {
            throw new Error ("El producto no existe")
        }
        return productos[indice]
    }

    save = async (data) => {
        const productos = await leerArchivo(nombreArchivoProductos);
        const producto = {
            producto: data.producto,
            precio: data.precio,
            id: productos[productos.length - 1].id + 1
        }
        productos.push(producto);
        guardarArchivo(productos, nombreArchivoProductos);
    }

    actualizar = async (data, id) => {
        const productos = await leerArchivo(nombreArchivoProductos);
        const indice = productos.findIndex((producto => producto.id == id));
        if(indice < 0) {
            throw new Error ("El producto no existe")
        }
        const productoActualizado = {
            producto: data.producto,
            precio: data.precio,
            id: productos[indice].id
        }
        productos.splice(indice,1,productoActualizado)
        guardarArchivo(productos, nombreArchivoProductos);
        return productoActualizado;
    }

    deleteById= async (id) =>{
        const productos = await leerArchivo(nombreArchivoProductos);
        const indice = productos.findIndex((producto => producto.id == id));
        if(indice < 0) {
            throw new Error ("El producto no existe")
        }
        productos.splice(indice, 1);
        guardarArchivo(productos, nombreArchivoProductos);
    }
    
    deleteAll = async () =>{
        await guardarArchivo([], nombreArchivoProductos)
    }

}

class ContenedorCarrito {
    contructor (nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    crearCarrito = async (data) =>{
        const carrito = await leerArchivo(nombreArchivoCarrito);
        const nuevoCarrito = {
            id: carrito[carrito.length-1].id + 1,
            productos: [{
                id: data.id,
                producto: data.producto,
                unidades: data.unidades
            }]
        }
        console.log(nuevoCarrito);
        carrito.push(nuevoCarrito);
        guardarArchivo(carrito, nombreArchivoCarrito);
    }

    deleteById = async (id) => {
        const carrito = await leerArchivo(nombreArchivoCarrito);
        const indice = carrito.findIndex((carrito => carrito.id == id));
        if(indice < 0) {
            throw new Error ("El producto no existe en el carrito")
        }
        carrito.splice(indice, 1);
        guardarArchivo(carrito, nombreArchivoCarrito);
    }

    getById = async (id) => {
        const carrito = await leerArchivo(nombreArchivoCarrito);
        const indice = carrito.findIndex((carrito => carrito.id == id));
        if(indice < 0) {
            throw new Error ("El producto no existe")
        }
        
        return carrito[indice].productos;
    }
    
    agregarCarrito = async (data, id) =>{
        const carrito = await leerArchivo(nombreArchivoCarrito);
        const nuevoProducto = {
            id: data.id,
            producto: data.producto,
            unidades: data.unidades
        }
        const indice = carrito.findIndex((carrito => carrito.id == id));
        carrito[indice].productos.push(nuevoProducto);
        guardarArchivo(carrito, nombreArchivoCarrito);
    }

    eliminarCarrito = async (id, id2) =>{
        const carrito = await leerArchivo(nombreArchivoCarrito);
        const indice1 = carrito.findIndex((carrito => carrito.id == id));
        const indice2 = carrito[indice1].productos.findIndex((carrito => carrito.id == id2));
        carrito[indice1].productos.splice(indice2, 1);
        guardarArchivo(carrito, nombreArchivoCarrito);
    }

}

const nombreArchivoProductos = "archivo.json";
const nombreArchivoCarrito = "carrito.json";

const contenedor1 = new ContenedorProductos(nombreArchivoProductos);
const contenedorCarrito = new ContenedorCarrito(nombreArchivoCarrito);

module.exports = {
    contenedor1,
    contenedorCarrito,
}