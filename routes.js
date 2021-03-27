const express = require('express');
const app = express();
const mongoose = require("mongoose");
const {mongourl} = require('./config/keys');
var jwt=require('jsonwebtoken')
var nodemailer=require('nodemailer')
var cors = require('cors');
app.use(cors());
var parse=require('csv-parse')

var sales_forecasting=require('./Predictions/Sales_Forecasting')

mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology: true});

//Models Imports
var UserRegistrationModel=require('./models/UserRegistration')
var AdminRegistration=require('./models/AdminRegistration')

var multer = require('multer')
var fs = require('fs');
var path=require('path')

//End Model Imports

module.exports = (app)=>{
app.get('/',(req,res)=>{
        res.render('home')
})
app.post('/registration',(req,res)=>{
    var UserData=new UserRegistrationModel({
        fname:req.body.fname,
        lname:req.body.lname,
        uname:req.body.uname,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
    })
    UserData.save((err,res)=>{
        if(err) throw err;
        console.log("Successfully !")
    })
})
app.get('/get_admin_info',(req,res)=>{
    var token=req.headers.token;
    var decoded=jwt.verify(token,'jwtPrivateKey')
    AdminRegistration.findOne({_id:decoded._id})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.get('/profile_info',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
        res.send({
            profile:data
        })
})
})
app.post('/update_customer',(req,res)=>{
    UserRegistrationModel.updateOne({email:req.body.uemail},{$set:{fname:req.body.ufname,lname:req.body.ulname,uname:req.body.uuname,email:req.body.uemail,phone:req.body.uphone,password:req.body.upassword}})
    .then(data=>{
        if(data)
        {
            console.log('Data Found'+data.id)
            res.send({
                data:data
            })    
        }
        else
        {
            res.send({data:'error'})
        }
        
    })
})
app.post('/update_customer_profile',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    UserRegistrationModel.updateOne({_id:decoded._id},{$set:{fname:req.body.fname,lname:req.body.lname,uname:req.body.uname,email:req.body.email,phone:req.body.phone,password:req.body.password}})
    .then(data=>{
        if(data)
        {
            console.log('Data Found'+data.id)
            res.send({
                data:data
            })    
        }
        else
        {
            res.send({data:'error'})
        }
        
    })
})

app.post('/update_admin',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    AdminRegistration.updateOne({_id:decoded._id},{$set:{uname:req.body.uname,email:req.body.email,phone:req.body.phone,password:req.body.password}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})

 app.post('/password_reset',(req,res)=>{
    console.log(req.body.email)
    UserRegistrationModel.findOne({email:req.body.email})
    .then((data)=>{
    if(data)
    {   
        console.log('data found')
    async function main() {
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true, // true for 465, false for other ports
       auth: {
         user: 'salestrendandforecasting@gmail.com',
         pass: '9Xwt3ve0',
       },
     });
     let info = await transporter.sendMail({
       from: '"Sales Trend and Forecasting" <salestrendandforecasting@gmail.com>',
       to: data.email,
       subject: "Password Reset", 
    //   text: "Hello world?", 
       html: "<h1>Welcome To 'Sales Trend & Forecasting Using Data Mining Techniques' ! </h1><p>\
       <h3>Hello "+data.fname+"</h3>\
       If You are requested to reset your password then click on below link<br/>\
       <a href='http://localhost:3000/change_password/"+data._id+"'>Click On This Link</a>\
       </p>",
     });
     if(info.messageId)
     {
        res.send({data:'please check your email to reset your password'})
        console.log('please check your email to reset your password')
    }
     else
     {
       res.send({data:'Some errors, try again!'})
       console.log('Some errors, try again!')
     }
   }
   main().catch(console.error);   
    }
    else
    {
        res.send({data:'This email not exists in out database.'})
    }
    })
})

app.post('/send-contact-email',(req,res)=>{
    async function main() {
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true, // true for 465, false for other ports
       auth: {
         user: 'salestrendandforecasting@gmail.com',
         pass: '9Xwt3ve0',
       },
     });
     let info = await transporter.sendMail({
       from: `"${req.body.name}" <${req.body.email}>`,
       to: "salestrendandforecasting@gmail.com",
       subject: req.body.subject, 
       html: 'This Email is from : '+req.body.email+'<br></br> Subject : '+req.body.subject+'<br></br> Message : '+ req.body.message
     });
     if(info.messageId)
     {
        res.send({data:'Thanks for your message. We will be touch with you as soon as possible.'})
        console.log('Thanks for your message. We will be touch with you as soon as possible.')
    }
     else
     {
       res.send({data:'Some errors, try again!'})
       console.log('Some errors, try again!')
     }
   }
   main().catch(console.error);   
})

app.post('/admin_password_reset',(req,res)=>{
    console.log(req.body.email)
    AdminRegistration.findOne({email:req.body.email})
    .then((data)=>{
    if(data)
    {   
        console.log('data found')
    async function main() {
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true, // true for 465, false for other ports
       auth: {
         user: 'afzaaljavaid47@gmail.com',
         pass: 'afzaal475456',
       },
     });
     var currentDateTime = new Date();
     let info = await transporter.sendMail({
       from: '"Afzaal Javaid" <afzaaljavaid47@gmail.com>',
       to: data.email,
       subject: "Password Reset", 
    //   text: "Hello world?", 
       html: "<h1>Welcome To 'Sales Trend & Forecasting Using Data Mining Techniques' ! </h1><p>\
       <h3>Hello "+data.fname+"</h3>\
       If You are requested to reset your password then click on below link<br/>\
       <a href='http://localhost:3000/admin_change_password/"+data._id+"'>Click On This Link</a>\
       </p>",
     });
     if(info.messageId)
     {
        res.send({data:'please check your email to reset your password'})
        console.log('please check your email to reset your password')
    }
     else
     {
       res.send({data:'Some errors, try again!'})
       console.log('Some errors, try again!')
     }
   }
   main().catch(console.error);   
    }
    else
    {
        res.send({data:'This email not exists in out database.'})
    }
    })
})


app.post('/admin_registration',(req,res)=>{
    var admin_data=new AdminRegistration({
        uname:req.body.uname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    })
    admin_data.save((err,res)=>{
        if(err) throw err;    
    })
})
app.post('/delete_customer/:id',(req,res)=>{
    console.log(req.params.id)
    UserRegistrationModel.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Customer Deleted Successfully ! "
        })
    }) 
})


app.get('/all_custumers_info',(req,res)=>{
   UserRegistrationModel.find({})
    .then(data=>{
        res.send(data);
    })
})

app.get('/get_customer_data/:id',(req,res)=>{
    UserRegistrationModel.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})

app.post('/admin_login',(req,res)=>{
    var user=new AdminRegistration({
        email:req.body.email,
        password:req.body.password
    })
    AdminRegistration.findOne({email:user.email,password:user.password})
    .then(data=>{
        var errors;
        var token;
        if(!data)
        {
            errors="Invalid E-Mail or Password";
        }
        else
        {
            token=jwt.sign({ _id:data._id },'jwtPrivateKey');
        }
        res.send({
              error:errors,
              tokens:token
        })
    })
    })
    
app.post('/login',(req,res)=>{
     var user=new UserRegistrationModel({
         email:req.body.email,
         password:req.body.password
     })
    UserRegistrationModel.findOne({email:user.email,password:user.password})
     .then(data=>{
        var errors;
        var token;
        if(!data)
        {
            errors="Invalid E-Mail or Password";
        }
        else
        {
            token=jwt.sign({ _id:data._id },'jwtPrivateKey');
        }
        res.send({
            error:errors,
            tokens:token
        })
     })
    
 })
let userID ;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv' ) {
            return cb(new Error('Only csv are allowed'))
        }
        cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null,  userID +'.csv');  
  }
});
var upload = multer({ storage: storage,  limits: { fileSize: 100 * 1024 * 1024   } }).single('file');

 app.post('/upload_data',(req,res)=>{
     console.log('Upload Data Body')
     var token=req.headers.token
     var decoded=jwt.verify(token, 'jwtPrivateKey')
     UserRegistrationModel.findOne({_id:decoded._id})
     .then(data=>{
     if(data)
      {
        console.log('data found')
        userID=data._id;
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
             return res.send('File Uploaded Successfully')
         })
      var dir = `\\excel_files\\${userID}`;
      if (!fs.existsSync(__dirname+dir)){
          fs.mkdirSync(__dirname+dir);
        }
        UserRegistrationModel.updateOne({_id:userID},{DataUploaded: true },function(err, res) {
            if (err) {
                throw err
                console.log(err);
            }   
        });
      }
     })
 })

 app.post('/update_reset_password',function(req, res){
    UserRegistrationModel.findOne({ _id: req.body.id }, function (errorFind, userData) {
        if(userData._id==req.body.id)
        {
            var token
            token=jwt.sign({ _id:userData._id },'jwtPrivateKey');
            UserRegistrationModel.updateOne({_id:userData._id},{password:req.body.password})
            .then(data=>{
                res.send({data:'Password reset successfully!',tokens:token})
            })
        }
        else if(errorFind)
        {
            res.send('Some errors try again')
        }
    }
    );
})

app.post('/update_admin_reset_password',function(req, res){
      AdminRegistration.findOne({ _id: req.body.id }, function (errorFind, userData) {
        if(userData._id==req.body.id)
        {
            var token
            token=jwt.sign({ _id:userData._id },'jwtPrivateKey');
       AdminRegistration.updateOne({_id:userData._id},{password:req.body.password})
            .then(data=>{
                res.send({data:'Password reset successfully!',tokens:token})
            })
        }
        else if(errorFind)
        {
            res.send('Some errors try again')
        }
    }
    );
})


app.get('/check_is_upload',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       res.send({data:data.DataUploaded,file:'http://localhost:5000/public/'+data._id +'.csv'})  
       console.log('localhost:5000/public/'+data._id +'.csv')     
     }
    })
})
app.get('/preview_data', (req, res)=> { 
    csvData=[]
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
    fs.createReadStream(`./public/${data._id}.csv`)
    .pipe(
        parse({
            delimiter:','
        })
    )
    .on('data',function(dataRow){
        csvData.push(dataRow)
    })
    .on('end',function(){
        console.log(csvData)
        res.status(200).json({data:csvData})
    })
}
})
})
app.get('/get_count_data',(req,res)=>{
    UserRegistrationModel.countDocuments({})
    .then(data=>{
        AdminRegistration.countDocuments({})
        .then(data1=>{
            res.send({atotal:data,adtotal:data1})
        })
          })
     
    })
    app.get('/all_admins_info',(req,res)=>{
        AdminRegistration.find({})
         .then(data=>{
             res.send(data);
         })
     })
     
}