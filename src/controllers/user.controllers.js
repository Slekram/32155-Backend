const passport = require("passport");

const passportOptions = {badRequestMessage: "Falta username / password"}; 

const singup = (req, res, next) => {
    passport.authenticate("singup", passportOptions, (err, user, info) => {
        if(err){
            return next(err);
        }
        if (!user) return res.status(401).json(info);
        res.json({msg: "Singup exitoso"});
    })
}

const login = (req, res) => {
    res.json({msg: "Welcome", user: req.user})
}

const getHome = (req, res) => {
    res.json(req.session);
}

module.exports = {
    singup,
    login,
    getHome
}