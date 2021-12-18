const express = require("express");
const mysql = require("mysql");
const router = require('./router/router');
const db = require('./connection');
const bodyParser = require('body-parser')
const cors = require('cors')


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const app = express();

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json())
app.use(express.json());
app.use('/api',router)





app.listen(5000, () => {
  console.log("server running from 5000");
});

