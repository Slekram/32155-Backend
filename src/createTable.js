const sqlite = require("./services/sqlite3");

async function createTableSqlite() {
    await sqlite.createTable();
    console.log("Tabla creada");
}

createTableSqlite();