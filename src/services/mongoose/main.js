const ProductosModel = require("./models/products");
const CarritoModel = require("./models/carrito");
const MensajesModel = require("./models/mensajes");
const {normalize, schema} = require("normalizr");

class ContenedorMensajes {

    getAll = async () => {
        const mensajes = await MensajesModel.find();
        return mensajes;
    }

    normalizar = async () => {
        const dataProcesada = await this.getAll().then((data)=>{
            return data;
        })

        
        const user = new schema.Entity("users");
        const mensajes = new schema.Entity("mensajes");

        const chat = new schema.Entity("chat", {
            mail: user,
            msg: [mensajes]
        });


        const normalizedData = normalize(dataProcesada, chat);

        return normalizedData;
    }

}

class ContenedorProductos {

    getAll = async () => {
        const productos = await ProductosModel.find();
        return productos;
    }

    getById = async (id) => {
        const productos = await ProductosModel.findById(id);
        return productos;
    }

    createProducts = async (data) => {

        const {producto, precio, stock} = data;
        await ProductosModel.create({
            producto,
            precio,
            stock
        });
        
    }

    actualizar = async (id, data) => {
        const {producto, precio, stock} = data;
        const productoActualizar = await ProductosModel.findByIdAndUpdate(
            id,
            {producto, precio, stock},
            {new: true}
        );
        return productoActualizar;
    }

    deleteById= async (id) =>{
        await ProductosModel.findByIdAndDelete(id);
    }
}

class ContenedorCarrito {

    crearCarrito = async (data) =>{
        const {producto, unidades, idcomprador} = data;
        await CarritoModel.create({
            idcomprador,
            producto,
            unidades

        });
    }

    deleteById = async (id) => {
        await CarritoModel.deleteMany({idcomprador: id});
    }

    getById = async (id) => {
        const carrito = await CarritoModel.find({idcomprador: id});
        return carrito;
    }

    agregarCarrito = async (data, id) =>{
        const {producto, unidades} = data;
        const idcomprador = id
        await CarritoModel.create({
            idcomprador,
            producto,
            unidades
        });
    }

    eliminarCarrito = async (id) =>{
        await CarritoModel.findByIdAndDelete(id);
    }

}

const productosModel = new ContenedorProductos;
const carritoModel = new ContenedorCarrito;
const mensajesModel = new ContenedorMensajes;

//console.log("ahora voy a normalizar");
const normalizar = async () => {
    const dataProcesada = await mensajesModel.getAll().then((data)=>{
        return data;
    })

    console.log(dataProcesada);
    console.log("Termine de normalizar");

}

//normalizar();

module.exports = {
    productosModel,
    carritoModel,
    mensajesModel,
}

