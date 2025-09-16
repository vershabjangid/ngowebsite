let Razorpay = require('razorpay')
let crypto = require('crypto')
const donationpaymentsmodel = require('../model/DonationPaymentModal')
const individualdonationpaymentmodel = require('../model/DonationWithoutLogin')



exports.generatedonationorderid = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_R8uShBQ0igwiZw",
            key_secret: "v8gHWVdJxcttYmGJMn219bej"
        })

        const options = {
            amount: req.body.Amount * 100,
            currency: "INR",
            receipt: `Receipt_${Date.now()}`,
            payment_capture: 1
        }


        const response = await razorpay.orders.create(options)
        if (req.body.Amount !== undefined || req.body.Amount !== 0) {
            let saveorder = await donationpaymentsmodel.create({
                Receipt_No: "RCESP-" + Math.floor(Math.random() * 10000),
                User_Id: req.session.user,
                Order_Id: response.id,
                Amount: req.body.Amount,
                Currency: "INR",
                CreatedOn: Date.now(),
                Bank_Name: req.body.Bank_Name,
                Branch_Name: req.body.Branch_Name,
                Pan_No: req.body.Pan_No
            })
            res.send(response)
        }
        else {
            res.send({
                Status: 0,
                Message: "Invalid Amount"
            })
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.viewfydonationpayment = async (req, res) => {
    try {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body
        let sign = razorpay_order_id + '|' + razorpay_payment_id
        const hmac = crypto.createHmac('sha256', process.env.PAYEMENTSECRET)
        hmac.update(sign.toString())
        const digest = hmac.digest('hex')

        if (digest === razorpay_signature) {
            await donationpaymentsmodel.updateOne(
                { Order_Id: razorpay_order_id },
                {
                    Payment_Id: razorpay_payment_id,
                    Payment_Signature: razorpay_signature,
                    Status: "Paid"
                }
            )
            res.send({
                Status: 1,
                Message: "Payment verified successfully"
            })

        }
        else {
            res.send({
                Status: 0,
                Message: "Payment verification failed"
            })
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something Went Wrong"
        })
    }
}



exports.viewalldonationstransactions = async (req, res) => {
    try {
        let viewdata = await donationpaymentsmodel.find({ User_Id: req.session.user }).sort({ _id: -1 })
        res.send(viewdata)
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.viewadmindonationstransactions = async (req, res) => {
    try {
        let viewdata = await donationpaymentsmodel.find({ Status: "Paid" }).sort({ _id: -1 })
        res.send(viewdata)
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}







exports.generateindividualdonationorderid = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_R8uShBQ0igwiZw",
            key_secret: "v8gHWVdJxcttYmGJMn219bej"
        })

        const options = {
            amount: req.body.Amount * 100,
            currency: "INR",
            receipt: `Receipt_${Date.now()}`,
            payment_capture: 1
        }


        const response = await razorpay.orders.create(options)
        if (req.body.Amount !== undefined || req.body.Amount >= 100) {
            let saveorder = await individualdonationpaymentmodel.create({
                Receipt_No: "RCESP-" + Math.floor(Math.random() * 10000),
                Name: req.body.Name,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Address: req.body.Address,
                Order_Id: response.id,
                Amount: req.body.Amount,
                Currency: "INR",
                CreatedOn: Date.now(),
                Bank_Name: req.body.Bank_Name,
                Bank_Branch: req.body.Bank_Branch,
                Pan_No: req.body.Pan_No
            })

            res.send(response)
        }
        else {
            res.send({
                Status: 0,
                Message: "Invalid Amount"
            })
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}




exports.verifyindividualdonationpayment = async (req, res) => {
    try {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body
        let sign = razorpay_order_id + '|' + razorpay_payment_id
        const hmac = crypto.createHmac('sha256', process.env.PAYEMENTSECRET)
        hmac.update(sign.toString())
        const digest = hmac.digest('hex')

        if (digest === razorpay_signature) {
            await individualdonationpaymentmodel.updateOne(
                { Order_Id: razorpay_order_id },
                {
                    Payment_Id: razorpay_payment_id,
                    Payment_Signature: razorpay_signature,
                    Status: "Paid"
                }
            )
            res.send({
                Status: 1,
                Message: "Payment verified successfully"
            })

        }
        else {
            res.send({
                Status: 0,
                Message: "Payment verification failed"
            })
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something Went Wrong"
        })
    }
}