const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/ecommerce";

const initMongoDB = async () => {
    try {
        console.log("Conectado a mi DB");
        await mongoose.connect(url);
        console.log("SE LOGRO LA CONEXION");
    } catch {
        console.log(`ERROR => ${error}`);
        return error; 
    }
}

module.exports = initMongoDB;