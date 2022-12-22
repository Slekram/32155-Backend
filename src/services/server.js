const express= require("express");
const http = require("http");
const {engine} = require("express-handlebars");
const {initWsServer} = require("./socket");
//const dotenv = require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");

const MainRouter = require("../routes/index");
const path = require("path");
const contenedor1 = require("../main");

const passport = require("passport");
const { loginFunc, signupFunc } = require("./auth");
//const { connect } = require("http2");


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

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Slekram:EguSGrKgcn4nrbQi@cluster0.qib83t1.mongodb.net/ecommerce?retryWrites=true&w=majority",
        //ttl: 180000,
        autoRemove: "interval",
        autoRemoveInterval: 1
    }),
    secret: "thisismysecret",
    cookie: {maxAge: 1000*60},
    saveUninitialized: true,
    resave: false
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use("signup", signupFunc);
passport.use("login", loginFunc);

// const users = [
//     {
//         username: "Maxi",
//         password: "12345",
//         admin: true
//     },
//     {
//         username: "Matias",
//         password: "12345",
//         admin: false
//     }
// ]

// app.post("/login", (req, res) => {
//     const {username, password} = req.body;

//     const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password); 

//     console.log(index);

//     if (index < 0) res.status(401).json({msg: "no estas autorizado"});
//     else {
//         const user = users[index];
//         req.session.info = {
//             loggedIn: true,
//             contador: 1,
//             admin: user.admin
//         };
//         res.json({msg: `Bienvenido ${user.username}`});
//     }
// })

// app.post("/logout", (req, res) => {
//     req.session.destroy();
//     res.json({msg: "sesion destruida"});
// })

// const validateLogIn = (req, res, next) => {
//     if (req.session.info.loggedIn) {next()
//     } else {res.status(401).json({msg: "No esta autorizado"})}
// }

// const isAdmin = (req, res, next) => {
//     if (req.session.info.admin) {next()
//     } else {res.status(401).json({msg: "No sos administrador"})}
// }

// app.get("/secret-endpoint", validateLogIn, (req, res) => {
//     req.session.info.contado++;
//     res.json({
//         msg: "Informacion super secreta",
//         contador: req.session.info.contador,
//         session: req.session
//     });
// });

// app.get("/secret-endpoint-admin", validateLogIn, isAdmin, (req, res) => {
//     req.session.info.contado++;
//     res.json({
//         msg: "Aca solo accede el admin",
//         contador: req.session.info.contador,
//         session: req.session
//     });
// });

app.use("/api", MainRouter);

const myHTTPServer = http.Server(app);

const data = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

initWsServer(myHTTPServer, data);

module.exports = myHTTPServer;
