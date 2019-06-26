let mongoose = require('mongoose');

//Article Schema
let userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

let User = module.exports = mongoose.model("User", userSchema)