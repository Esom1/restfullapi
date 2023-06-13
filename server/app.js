const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const postRouter = require('./router/postRouter')
const port = process.env.PORT || 7070

// CONFIG DOTENV
require('dotenv').config()

// middleware
app.use(express.json())

// ENVIRONMENTAL VARIABLE
const mongoDB_url  = process.env.DBURL

// MONGODB CONNECTION
const connect = ()=>{
  mongoose.connect(mongoDB_url)
  try{
    console.log('DB connected successfully');
  }catch(err){
    console.log(err);
  }
}


// routes
// app.get('/', function (req, res){
//   res.send('Hello World')
// })

app.use('/posts',postRouter)


// port
app.listen (port,()=>{
  connect()
  console.log(`app running on port ${port}`);
})