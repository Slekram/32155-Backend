const mongoose = require("mongoose");

const mensajesCollectionName = "mensajes";

const mensajesSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    mail: {type: String, require: true},
    msg: {type: String, require: true}
})

const MensajesModel = mongoose.model(mensajesCollectionName, mensajesSchema);

module.exports = MensajesModel;