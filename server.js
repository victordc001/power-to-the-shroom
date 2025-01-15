
 const express = require('express');
 const ejs = require('ejs');
 const mongodb = require('mongodb');
 const mongoose = require('mongoose');
 const dotenv = require('dotenv');
 const cors = require('cors');
 const axios = require('axios');
 const path = require('path'); 
 const nodemailer = require('nodemailer');
    
 const app = express(); 
 app.set('view engine', 'ejs');    
 app.use(express.json());
 app.use(express.urlencoded({extended:false})); 
 app.use(cors());
 dotenv.config();   
 
  

 app.get('/', (req,res)=>{
     res.render('./pages/index');
 });
   

 app.post('/subm', async (req,res)=>{ 
       const dnumber = req.body.fnumber;  
       const demail = req.body.femail; 
       console.log(dnumber); 
       console.log(demail);
       try{
         ///create SMTP transporter
     const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com', 
        port: 587,
        auth: {
            user:process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASS,
        }
    });
  

       //set mail option
       const mailOptions = {
        from: 'info@powertotheshroom.com',
        to: 'shamanshu@soultribes.org',
        subject: 'NEW MEMBER FROM POWERTOTHESHROOM',
        text: `A new member has joined powertotheshroom.com! Their email is: ${demail}, and Their phone number is: ${dnumber}`,
      };
      
  
  
       transporter.sendMail(mailOptions, (error, info)=>{
             if(error){
               console.log(error);
             } else{
                 res.status(200).send('success');
             }
       });  
      res.json({msg : 'success'});
       }   catch(err) {
              res.status(500).send('An error occured, please try again');
       }
 });

 app.use(express.static(__dirname + '/public'));

 app.listen(3000, ()=>{
    console.log('server running on port 3000');
 });
 
 