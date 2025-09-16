let mongoose = require('mongoose');

let createproofileschema = mongoose.Schema({
    Sub_Id: {
        type: String,
        required: true,
        unique: true
    },
    User_ID: {
        type: String,
        required: true,
        unique: true
    },
    Full_Name: {
        type: String,
        required: true
    },
    Father_Name: {
        type: String,
        required: true
    },
    Occupation: {
        type: String,
        required: true
    },
    Date_Of_Birth: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Aadhar_NO: {
        type: Number,
        required: true,
        unique: true
    },
    Upload_Aadhar: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Select_Designation: {
        type: String,
        required: true
    },
    Profile_Picture: {
        type: String,
        required: true
    },
    Shapath: {
        type: String,
        required: true
    },
    CreatedOn: {
        type: String,
        default: Date.now()
    }
})



let createprofilemodel = mongoose.model('profiles', createproofileschema)
module.exports = createprofilemodel