const Server = require("./services/server");
const initMongoDB = require("./services/mongoose/DB/database");

const PORT = process.env.PORT || 8080;

const init = async () => {
    await initMongoDB();
    Server.listen(PORT, ()=>{
        console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
    });
}

init();


