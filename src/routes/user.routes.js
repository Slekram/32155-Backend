const passport = require("passport");
const {Router} = require("express");

const { login, getHome, singup } = require("../controllers/user.controllers");
const isLoggedIn = require("../middlewares/user.middlewares");

const rutaUsuarios = Router();

const passportOptions = {badRequestMessage: "Falta username / password"}; 

rutaUsuarios.post("/singup", singup);
rutaUsuarios.post("/login", passport.authenticate("login", passportOptions), login);
rutaUsuarios.get("/home",isLoggedIn, getHome);

module.exports = rutaUsuarios;