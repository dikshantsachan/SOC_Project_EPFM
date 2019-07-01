const http= require('http');   //protocols imported

const app= require('./app');

const port= process.env.PORT || 8080;  //Either use the port given to you by the webpage provider in environment varible or use the default port 3000

const server= http.createServer(app); // Server created from HTTP package to handle the incoming requests and transfer it to app

server.listen(port); //All requests handled here and are passed to line 5 from where it passes to appropriate listener functions (7->5->functions)


