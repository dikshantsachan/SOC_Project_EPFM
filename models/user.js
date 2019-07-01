let mongoose = require('mongoose');
var Task = require('./task')
const Schema = mongoose.Schema;

//User Schema
let userSchema = new Schema({
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
    },
    manager_id:{
        type:String,
        required: false
    },
    tasksPending:[
        {type: Schema.Types.ObjectId, ref: 'Task'}
    ],
    tasksCompleted:[
        {type: Schema.Types.ObjectId, ref: 'Task'}
    ]
});




userSchema.set('toJSON', { virtuals: true });

let User = module.exports = mongoose.model("User", userSchema)