let mongoose = require('mongoose');



//Manager Schema
let managerSchema = new mongoose.Schema({
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




managerSchema.set('toJSON', { virtuals: true });

let User = module.exports = mongoose.model("User", managerSchema)