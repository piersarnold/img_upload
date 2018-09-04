var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    img: String
});

module.exports = mongoose.model("Users", userSchema);