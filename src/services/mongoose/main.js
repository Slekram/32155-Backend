const ProductosModel = require("./models/products");
const CarritoModel = require("./models/carrito");

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

module.exports = {
    productosModel,
    carritoModel
}

