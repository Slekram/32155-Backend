const io = require("socket.io");
const contenedor1 = require("../main");

let myWebSocketServer;

const initWsServer = (server, message) => {
    myWebSocketServer =  io(server);

    myWebSocketServer.on("connection", async (socket) => {
        console.log("Nueva conexion establecida");
        socket.emit("menssages", message);
        const productos = await contenedor1.getAll().then((data)=>{
                return data;
            });
        myWebSocketServer.emit('productos', productos);
        socket.on('new-message', (data) => {
            console.log(data);
            message.push(data);
            myWebSocketServer.sockets.emit('menssages', message);
        });

        socket.on('nuevoProducto', async (data) => {
            console.log(data);
            await contenedor1.save(data);
            const productos = await contenedor1.getAll().then((data)=>{
                return data;
            });
            console.log(productos);
            myWebSocketServer.emit('productos', productos);
        });

        //console.log("ID SERVER",socket.id);
        //console.log("ID CLIENTE" , socket.client.id);
    
        // socket.on("eventoServer", (dataRecibida) => {
        //     console.log(`El cliente ${socket.client.id} me acaba de mandar data del eventoServer`);
        //     socket.emit("respuesta", { recibido: "ok" });
        // });

        return myWebSocketServer;

    })

}

const getWsServer = () => {
    return myWebSocketServer;
}

module.exports = {
    initWsServer,
    getWsServer
};