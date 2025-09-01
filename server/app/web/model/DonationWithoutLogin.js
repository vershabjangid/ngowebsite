let mongoose = require('mongoose')

let individualdonationpaymentSchema = mongoose.Schema({
    Receipt_No: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Order_Id: {
        type: String
    },
    Payment_Id: {
        type: String
    },
    Payment_Signature: {
        type: String
    },
    Amount: {
        type: Number
    },
    Currency: {
        type: String
    },
    Status: {
        type: String,
        default: "Failed"
    },
    Bank_Name: {
        type: String,
        required: true
    },
    Bank_Branch: {
        type: String,
        required: true
    },
    Pan_No: {
        type: String,
        required: true
    },
    CreatedOn: {
        type: Number,
        required: true
    }
}, { timestamps: true })

let individualdonationpaymentmodel = mongoose.model('donationindividual', individualdonationpaymentSchema);
module.exports = individualdonationpaymentmodel;