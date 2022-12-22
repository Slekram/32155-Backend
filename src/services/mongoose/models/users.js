const mongoose = require("mongoose");

const userCollectionName = "usuarios";

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    admin: {type: Boolean, default: false}
})

const UserModel = mongoose.model(userCollectionName, userSchema);

module.exports = UserModel;