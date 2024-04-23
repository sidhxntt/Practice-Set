const express = require('express')
const moment =require( 'moment');

const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
const time=function(req,res,next){
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // Custom format
    console.log(timestamp);
    next();
}

const consoler=[myLogger,time]
app.use(consoler)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)