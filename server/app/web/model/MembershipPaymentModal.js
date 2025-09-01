let mongoose = require('mongoose')

let membershippaymentSchema = mongoose.Schema({
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
    CreatedOn: {
        type: Number,
        required: true
    },
    ExpiresOn: {
        type: Number,
        required: true
    }
}, { timestamps: true })

let membershippaymentsmodel = mongoose.model('memberships', membershippaymentSchema);
module.exports = membershippaymentsmodel;