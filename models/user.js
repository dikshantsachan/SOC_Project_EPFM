let mongoose = require('mongoose');
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
        {   TaskDescription:{type:String},
            Task:{type: String},
            date:{type: Date}
        }
    ],
    tasksCompleted:[
        {   TasksDescription:{type:String},
            Task:{type: String},
            date:{type: Date}
        }
    ]
});




userSchema.set('toJSON', { virtuals: true });

let User = module.exports = mongoose.model("User", userSchema)