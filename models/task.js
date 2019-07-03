mongoose = require('mongoose')

//task Schema
let taskSchema = new mongoose.Schema({
    TasksDescription:{
        type:String
    },
    Task:{
        type: String
    },
    date:{
        type: Date
    }
})

let Task = module.exports = mongoose.model("Task", taskSchema)