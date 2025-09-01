let mongoose = require('mongoose')

let donationpaymentSchema = mongoose.Schema({
    Receipt_No: {
        type: String,
        required: true,
        unique: true
    },
    User_Id: {
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
    Branch_Name: {
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

let donationpaymentsmodel = mongoose.model('donation', donationpaymentSchema);
module.exports = donationpaymentsmodel;