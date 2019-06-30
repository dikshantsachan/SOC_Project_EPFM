const express= require('express');// Requests need to be handled here so express imported

const router= express.Router(); // Different routes handled by this function in express 

const mongoose= require('mongoose');

const Commentschematic= require('../models/comment'); 

router.get('/',( req, res, next)=>{  //first route

    Commentschematic.find().select('name1 name2 comments _id').exec().then(docs=>{  //find all products 
        console.log(docs);
        const response={
            count : docs.length,
            comments : docs.map(docs=>{
                return{
                    name1: docs.name1,
                    name2: docs.name2,
                    commentname: docs.comments,
                    _id:docs._id,
                   
                }
            })
        };
        res.status(200).json({response});
    }).catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
   
});










router.post('/',( req, res, next)=>{    //second route

    var p1 = req.body.comment;
    var p2 = req.body.name1;
    
    const newcomment = new Commentschematic({       //newcomment object of mongoose created
        _id:new mongoose.Types.ObjectId(),  //we need to get an new id so we we first import mongoose package to use this function ObjectId in require('mongoose')and then we call it        
        name1 : req.body.name1,
        name2 : req.body.name2,
        comments : {comment:p1, name: p2}
    });

    newcomment.save().then(result=>{                //To save the entry,then show the result or errors occuring, we could have used a callback function with
        console.log(result);                      //save((err,result)=> ) to handle the crap
        res.status(201).json({
            message: 'Handling Post requests to /chat',
            createdCommentSet : {
                name1: result.name1,
                name2: result.name2,
                comments: result.comments[0],
                _id: result._id,
                
            }
        })
    }).catch(err=> {
            console.log(err);
            res.status(500).json({error:err})
        });
        
    });







 //{ $or: [ {name1: req.body.name1, name2: req.body.name2}, {name1: req.body.name2, name2: req.body.name1} ] }








    
    router.patch('/', (req, res, next) => {

        var comm= {"comment": req.body.comment, "name": req.body.name};

        Commentschematic.findOneAndUpdate({ $or: [ {name1: req.body.name1, name2: req.body.name2}, {name1: req.body.name2, name2: req.body.name1}]} ,{$push : {comments: comm }}).exec().then(result => {
            console.log(result);

            res.status(200).json({
                message: 'Handling update requests to /addcomment',
                createdCommentSet : {
                    name1: result.name1,
                    name2: result.name2,
                    comments: result.comments,
                    _id: result._id,
                    
                }
            });
    
        }).catch(err=> {
            console.log(err);
            res.status(500).json({error:err})
        });

        //var friend = {"firstName": req.body.fName, "lastName": req.body.lName};
        //Users.findOneAndUpdate({name: req.user.name}, {$push: {friends: friend}});

    });




    router.get('/display/:name1/:name2',( req, res, next) => {
        name1 = (req.params.name1);
        name2 = (req.params.name2);
        Commentschematic.findOne({ $or: [ {name1: name1, name2: name2}, {name1: name2, name2: name1}]})
        .exec()
        .then(docs => {
            res.json({docs});
        })
        .catch(error => {
            res.status(500).json({error : error});
        })
        
    });









/*














router.patch('/:productId',( req, res, next)=>{  //3rd route

    res.status(200).json({
        message: 'Updated product'
    });


const id = req.params.productId;
const updateOps={};

for(const ops of req.body){
    updateOps[ops.propName]=ops.value;
}
Commentschematic.update({_id: id},{$set:updateOps}).exec().then(result=>{
console.log(result);
res.status(200).json(result);
}).catch(err=>{
    console.log(err);
    res.status(500).json({error: err});
});

});


router.delete('/:productId',( req, res, next)=>{  //4th route
/*    
    res.status(200).json({
        message: 'Deleted product'
    });


const id = req.params.productId;
Commentschematic.remove({_id: id}).exec().then(result=>{
    res.status(200).json(result);
}).catch(err=> {
    console.log(err);
    res.status(500).json({error:err});
})
});


router.get('/:productId',( req, res, next)=>{  //5th route to get details of a particulat product
    
    const id=req.params.productId;

    Commentschematic.findById(id).select('name price _id').exec()
    .then(
        doc => {
        console.log("From database",doc);
        if(doc) //if it exists
        res.status(200).json({
            product:doc,
            request: {
                type:'GET',
                url:'http://localhost:3000/products/'
            }
        });

        else
        res.status(404).json({message: 'No valid entry found in database'});
        }
    )
    .catch(err => 
    { 
        console.log(err);
        res.status(500).json({error: err});
    });
/*Before mongoose was used, just for testing
    res.status(200).json({
        message: 'Id of product is',
        id: id
    });

});

*/
module.exports = router;  //router with these properties exported