const mongoose = require("mongoose");

const productsCollectionName = "productos";

const productsSchema = new mongoose.Schema({
    producto: {type: String, require: true},
    precio: {type: Number, require: true},
    stock: {type: Number, require: true}
})

const ProductsModel = mongoose.model(productsCollectionName, productsSchema);

module.exports = ProductsModel;