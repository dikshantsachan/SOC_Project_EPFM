mongoose = require('mongoose')

//task Schema
let taskSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    TasksDescription:{
        type:String,
        required:true
    },
    Task:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required: true
    }
})

let Task = module.exports = mongoose.model("Task", taskSchema)