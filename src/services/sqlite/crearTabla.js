const { ClientSqlite } = require("./sqlite3");
const {options} = require("./sqlite3");

const sqlite = new ClientSqlite(options);

async function createTableCarrito(){
    await sqlite.createTable().then(()=>{
        console.log("Tabla creada con exito");
    });
    
}

createTableCarrito();