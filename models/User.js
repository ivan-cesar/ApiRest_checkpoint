const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nom:String,
    email:String,
    age:Number,
});


module.exports = mongoose.model("users",userSchema);