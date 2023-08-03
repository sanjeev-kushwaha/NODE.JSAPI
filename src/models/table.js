
// THIS CODE IS USED FOR CREATE A TABLE OR COLLECTION IN DB AND THE COLLECTION NAME IS (UserDetails) 

const express = require('express');
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    FullName:{
        type:String,
        required:true,
        trim:true
    }, 
    EmailAddress:{
        type:String,
        required:true,
        trim:true
    },
     Password:{
        type:String,
        required:true,
        trim:true
    },
     PhoneNumber:{
        type:Number,
        required:true,
        trim:true
    }, 
    DOB:{
        type:String,
        required:true,
        trim:true
    },
    Gender:{
        type:String,
        required:true,
        trim:true
    },
})

const UsersDetail = new mongoose.model("RegistrationDetails",tableSchema)

module.exports = UsersDetail;