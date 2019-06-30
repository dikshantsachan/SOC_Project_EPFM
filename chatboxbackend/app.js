const express= require('express'); //express framework to handle the requests

const app= express(); //Now its functions are available for use in the app file i.e. successfully imported

const morgan= require('morgan'); //Sends a console message about every request made

const bodyParser= require('body-parser'); // Is used for converting urlencoded data and json files into readable format

const mongoose = require('mongoose'); //imported

const commentRoutes= require('./api/routes/comments');

//const orderRoutes= require('./api/routes/orders');

mongoose.connect('mongodb+srv://chatboxer:chatboxer@chatbox-qaytx.mongodb.net/test?retryWrites=true&w=majority',{   //to access mongoose cloud
useMongoClient:true

});

/*mongoose.connect('mongodb+srv://chatboxer:chatboxer@chatbox-qaytx.mongodb.net/test?retryWrites=true&w=majority', () => { }, { useNewUrlParser: true })
    .catch(err => {
        console.log(err);
    });
*/
 mongoose.Promise=global.Promise;
/*
app.use((req, res, next)=> {    //middleware added to handle the requests
    res.status(200).json({       //json automatically stringified to string  
        message: 'It works'
     });
});
*/
//Now instead of using the above way of handling requests, we are using product routes


app.use(morgan('dev')); //We use it before the requests are transferred to /comments and /orders files

app.use(bodyParser.urlencoded({extended:false}));// url data converted to readable format, extended false means url will contain simple text
app.use(bodyParser.json());// json data converted to readable format

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //to allow access by other machines (security pupose by browser)
    res.header('Access-Control-Allow-Headers', '*');  //To allow which type of headers are allowed to be executed (* means all type)

    if (req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/chat',commentRoutes); 

//app.use('/addcomment',commentRoutes);//all urls starting with /product should go to product file in api->routes->product

//app.use('/orders',orderRoutes);  //all urls starting with /orders should go to order file in api->routes->order

app.use((req, res, next)=> {

    const error= new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) => {
    
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports=app;  //app object configured with data and now its exportable

