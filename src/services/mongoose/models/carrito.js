const mongoose = require("mongoose");

const carritoCollectionName = "carrito";

const carritoSchema = new mongoose.Schema({
    idcomprador: {type: Number, require: true},
    producto: {type: String, require: true},
    unidades: {type: Number, require: true}
})

const CarritoModel = mongoose.model(carritoCollectionName, carritoSchema);

module.exports = CarritoModel;