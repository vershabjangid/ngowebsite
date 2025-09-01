let mongoose = require('mongoose')

let homeManagementschema = mongoose.Schema({
    Home_Management_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_Management_Description: {
        type: String,
        required: true
    }
})

let homeManagementdatamodel = mongoose.model('homemanagementsdata', homeManagementschema)
module.exports = homeManagementdatamodel