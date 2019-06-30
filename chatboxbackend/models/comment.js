const mongoose = require('mongoose');    //to define schemas of every product 

const commentSchema = mongoose.Schema({
    
    _id : mongoose.Schema.Types.ObjectId,   //here ObjectId function is not called because it only defines what type of data _id is going to get
    name1: {type:String, required:true},
    name2: {type:String, required:true},
    comments: [ {comment: String, name: String}]
}) ;

module.exports = mongoose.model('Commentschematic', commentSchema);   //to use it , we write 'Product' as a sort of convention (model name is Product starting with an upper case character)

