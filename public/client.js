const socket = io.connect();

const render = (data) => {
    const html = data.map((elem) => {
        return(`<div>
        <span> ${elem.author}</span>:
        <span> ${elem.text}</span> </div>` )
    });
    document.getElementById ('messages').innerHTML = html;
};

const renderProductos = (data) => {
    const html = data.map((elem) => {
        return(`<div>
        <span> Producto: ${elem.producto}</span>:
        <span> Precio: ${elem.precio}</span> </div>` )
    });
    document.getElementById ('productos').innerHTML = html;
};

socket.on("menssages", (data) => {
    console.log(data);
    render(data);
});

socket.on("productos", (data) => {
    console.log(data);
    console.log("Mensaje con productos recibido");
    renderProductos(data);
});

const formProductos = document.getElementById("form");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");

formProductos.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    const nuevoProducto ={
        producto: producto.value,
        precio: precio.value,
    };
    
    console.log(nuevoProducto);

    socket.emit("nuevoProducto", nuevoProducto);

    producto.value = " ";
    precio.value = " ";
});

const formChat = document.getElementById("formChat");
const usuario = document.getElementById("usuario");
const msg = document.getElementById("msg");

formChat.addEventListener("submit", (ev)=>{
    ev.preventDefault();
    
    const nuevoMensaje ={
        author: usuario.value,
        text: msg.value,
    };

    socket.emit('new-message', nuevoMensaje);

    msg.value = " ";

});