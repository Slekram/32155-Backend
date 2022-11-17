const knex = require("knex");

const options = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "productos"
    }
};



class ClientSql {
    constructor(config){
        this.knex = knex(config)
    }

    async createTable () {
        await this.knex.schema.dropTableIfExists("ecommerce");
        await this.knex.schema.createTable("ecommerce", table => {
            table.increments("id").primary();
            table.string("producto", 100).notNullable();
            table.integer("precio");
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

const sql = new ClientSql(options);

module.exports = sql;