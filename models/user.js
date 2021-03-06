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
        {   TaskDescription:{type:String},
            Task:{type: String},
            date:{type: Date},
            efficiency:{type: Number},
            speed:{type: Number},
            development:{type: Number},
            accountability:{type: Number},
            feedback:{type: String},
            dateCompleted:{type: Date}
        }
    ],
    sex:{type : String}
});




userSchema.set('toJSON', { virtuals: true });

let User = module.exports = mongoose.model("User", userSchema)