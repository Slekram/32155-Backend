const knex = require("knex");

const options = {
    client: "sqlite3",
    connection: {
        filename: "./DB/mydb.sqlite"
    }
};

class ClientSqlite {
    constructor(config){
        this.knex = knex(config)
    }

    async createTable () {
        await this.knex.schema.dropTableIfExists("carrito");
        console.log("Tabla dropeada");
        await this.knex.schema.createTable("ecommerce", table => {
            table.increments("id").primary();
            table.string("producto", 100).notNullable();
            table.integer("unidades");
        })
    }

    async getAllProducts() {
        return this.knex.from("productos").select("*");
    }

    async getProductsById(id) {
        return this.knex.from("productos").where("id", id);
    }

    async insertProducts(product) {
        await this.knex("productos").insert(product);
    }

    async deleteProductById(id){
        await this.knex.from("productos").where("id", id).del();
    }

    async updateProduct(id, data){
        await this.knex.from("productos").where("id", id).update({
            producto: data.producto,
            precio: data.precio
        });
    }

    async close (){
        await this.knex.destroy();
    }

}

const sqlite = new ClientSqlite(options); 

async function createTableCarrito(){
    await sqlite.createTable().then(()=>{
        console.log("Tabla creada con exito");
    });
    
};

createTableCarrito();

module.exports = {
    ClientSqlite,
    options
}