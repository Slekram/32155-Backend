const Server = require("./services/server");

const PORT = process.env.PORT || 8080;

Server.listen(PORT, ()=>{
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});