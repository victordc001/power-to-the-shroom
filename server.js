
 const express = require('express');
 const ejs = require('ejs');
 const mongodb = require('mongodb');
 const mongoose = require('mongoose');
 const dotenv = require('dotenv');
 const cors = require('cors');
 const axios = require('axios');
 const path = require('path');
    
 const app = express(); 
 app.set('view engine', 'ejs');    
 app.use(express.json());
 app.use(express.urlencoded({extended:false})); 
 app.use(cors());
 dotenv.config();   
 
  

 app.get('/', (req,res)=>{
     res.render('./pages/index');
 });

 app.use(express.static(__dirname + '/public'));

 app.listen(3000, ()=>{
    console.log('server running on port 3000');
 });
 
 