const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../services/mongoose/models/users");

const strategyOpcions = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallBack: true
};

const signup = async (req, username, password, done) => {
    console.log("signup");
    try{
        const newUser = await UserModel.create({username, password});
        return done(null, newUser);
    } catch(error) {
        console.log(error);
        return done(null, false, {msg: "Error inesperado"});
    }
}

const login = async (req, username, password, done) => {
    console.log("LOGIN");
    const user = await UserModel.findOne({username, password});
    if (!user) return done(null, false);
    console.log("Usuario Encontrado");
    return done(null, user);
}

const signupFunc = new LocalStrategy(strategyOpcions, signup);
const loginFunc = new LocalStrategy(strategyOpcions, login);


passport.serializeUser((user, done) => {
    console.log("ejecute serialize");
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    console.log("ejecute deserialize");
    const user = await UserModel.findById(userId);
    return done(null, user);
});

module.exports = {
    loginFunc,
    signupFunc
}