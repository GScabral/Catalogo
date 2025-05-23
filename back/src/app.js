const express=require("express");
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors = require('cors');
const path=require('path');
const routes=require("./routes/indexR.js")


require('./db.js');


const server =express();
server.name="BACKEND";


server.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
server.use(bodyParser.json({limit:'50mb'}));
server.use(cookieParser());

server.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));



server.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "https://amore-mio.onrender.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS,PATCH");
    next();
})
server.use('/',routes);

server.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    console.error(err);
    res.status(status).send(message)
})

module.exports=server;
