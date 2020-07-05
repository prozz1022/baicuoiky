const express = require('express');
const mongoose =require('mongoose');
const billRoute = require('./router/bill.route');
var cors = require('cors')
var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/phongdata', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/',(req,res)=>{
    res.send("sdsd2312321d")
})

app.use('/bill',cors(),billRoute);

const port = 3001;

app.listen(port);