const express= require("express");
const http = require("http");
const {engine} = require("express-handlebars");
const {initWsServer} = require("./socket");



const MainRouter = require("../routes/index");
const path = require("path");
const contenedor1 = require("../main");

const viewsFolderPath = path.resolve(__dirname, "../../views");
const layoutFolderPath = `${viewsFolderPath}/layouts`;
const defaultLayoutPath = `${layoutFolderPath}/index.hbs`;
const partialsFolderPath = `${viewsFolderPath}/partials`;

const app = express();

app.use(express.static("public"));

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

app.use("/api", MainRouter);

const myHTTPServer = http.Server(app);

const data = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

initWsServer(myHTTPServer, data);

module.exports = myHTTPServer;
