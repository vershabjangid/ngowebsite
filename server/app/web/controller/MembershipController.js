let Razorpay = require('razorpay')
const membershippaymentsmodel = require('../model/MembershipPaymentModal')
let crypto = require('crypto')


exports.generatemembershipoderid = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_R8uShBQ0igwiZw",
            key_secret: "v8gHWVdJxcttYmGJMn219bej"
        })

        const options = {
            amount: 100 * 100,
            currency: "INR",
            receipt: `Receipt_${Date.now()}`,
            payment_capture: 1
        }

        const response = await razorpay.orders.create(options)
        const viewmembership = await membershippaymentsmodel.findOne({ User_Id: req.session.user, Status: "Paid" })
        if (viewmembership === null) {
            let saveorder = await membershippaymentsmodel.create({
                Receipt_No: "RCESP-" + Math.floor(Math.random() * 10000),
                User_Id: req.session.user,
                Order_Id: response.id,
                Amount: 100,
                Currency: "INR",
                CreatedOn: Date.now(),
                ExpiresOn: Date.now() + 365 * 24 * 60 * 60 * 1000
            })
            res.send(response)
        }
        else {
            res.send({
                Status: 0,
                Message: "Membership already active"
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


exports.verifymembershippayment = async (req, res) => {
    try {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body
        let sign = razorpay_order_id + "|" + razorpay_payment_id
        const hmac = crypto.createHmac('sha256', process.env.PAYEMENTSECRET)
        hmac.update(sign.toString())
        const digest = hmac.digest("hex");

        if (digest === razorpay_signature) {

            await membershippaymentsmodel.updateOne(
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



exports.viewmembershipstatus = async (req, res) => {
    try {
        let viewdata = await membershippaymentsmodel.findOne({ User_Id: req.session.user, Status: "Paid" })
        if (viewdata.ExpiresOn < Date.now()) {
            let updatedata = await membershippaymentsmodel.updateOne({ User_Id: req.session.user, Status: "Paid" }, {
                Status: "Expired"
            })
            let viewdata = await membershippaymentsmodel.findOne({ User_Id: req.session.user, Status: "Paid" })
            res.send(viewdata)
        }
        else {
            res.send(viewdata)
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.viewallmembershiptransactions = async (req, res) => {
    try {
        let viewdata = await membershippaymentsmodel.find({ User_Id: req.session.user }).sort({ _id: -1 })
        res.send(viewdata)
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}





exports.viewadminmembershiptransactions = async (req, res) => {
    try {
        let viewdata = await membershippaymentsmodel.find({ Status: "Paid" }).sort({ _id: -1 })
        res.send(viewdata)
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}
