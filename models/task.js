mongoose = require('mongoose')

//task Schema
let taskSchema = new mongoose.Schema({
    task:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required: true
    }
})

let Task = module.exports = mongoose.model("Task", taskSchema)