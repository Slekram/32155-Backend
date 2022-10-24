const express= require("express");
const {engine} = require("express-handlebars");
const MainRouter = require("../routes/index");
const path = require("path");
const app = express();
const contenedor1 = require("../main");

const viewsFolderPath = path.resolve(__dirname, "../../views");
console.log(viewsFolderPath);
const layoutFolderPath = `${viewsFolderPath}/layouts`;
const defaultLayoutPath = `${layoutFolderPath}/index.hbs`;
const partialsFolderPath = `${viewsFolderPath}/partials`;
app.set("view engine", "hbs");
app.set("views", viewsFolderPath );

app.engine("hbs", engine({
    layoutsDir: layoutFolderPath,
    extname: "hbs",
    defaultLayout: defaultLayoutPath,
    partialsDir: partialsFolderPath,
}));

app.get("/", (req, res) => {
    res.render("main")
});

app.get("/productos", async(req, res) => {
    const productos = await contenedor1.getAll().then((data)=>{
        return data;
    })
    res.render("productos" ,{producto: productos})
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.use("/api", MainRouter);

module.exports = app;
