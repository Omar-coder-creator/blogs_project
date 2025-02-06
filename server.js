const express = require('express');
const blogRouter = require('./routes/blogRouter.js')
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const app = express() ;
app.use(cors());

app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to the DB !');
})

app.use('/blogs',blogRouter);

app.listen(3000,()=>{
    console.log('server is listening on 3000')
})



