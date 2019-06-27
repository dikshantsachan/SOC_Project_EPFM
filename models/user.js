let mongoose = require('mongoose');



//User Schema
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




userSchema.set('toJSON', { virtuals: true });

let User = module.exports = mongoose.model("User", userSchema)