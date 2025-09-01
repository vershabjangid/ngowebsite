let express = require('express')
let websiteroutes = express.Router()
let multer = require('multer')
let path = require('path')
let jwt = require('jsonwebtoken')
let dotenv = require('dotenv')
const { websiteregister, verifyregister, resendotp, createprofilecontroller, logincontroller, forgotpassword, updatepassword, checkwebsession, weblogout, viewprofile, updateprofile } = require('../../controller/AuthController')
const { viewnotices } = require('../../controller/noticecontroller')
const { viewcertificates } = require('../../controller/certificatecontroller')
const { generatemembershipoderid, getpayments, verifymembershippayment, viewmembershipstatus, viewallmembershiptransactions } = require('../../controller/MembershipController')
const { generatedonationorderid, viewfydonationpayment, viewalldonationstransactions, generateindividualdonationorderid, verifyindividualdonationpayment } = require('../../controller/donationcontroller')
dotenv.config({ debug: false, quiet: true });


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extension = path.extname(file.originalname);
            const filename = 'file' + uniquesuffix + extension;
            cb(null, filename)
        }
        else {
            const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const filename = 'file' + uniquesuffix + ".fake";
            cb(null, filename)
        }
    }
})


const upload = multer({ storage: storage }).any(['Upload_Aadhar', 'Profile_Picture'])


let verifytoken = (req, res, next) => {
    let header = req.headers['authorization']

    if (!header) {
        res.send({
            Status: 0,
            Message: "Token is required"
        })
    }
    else {
        jwt.verify(header, process.env.WEBJWTTOKEN, (err, user) => {
            if (err) {
                res.send({
                    Status: 0,
                    Message: "Invalid Token"
                })
            }
            else {
                next();
            }
        })
    }
}


let websitesession = (req, res, next) => {
    if (!req.session.user) {
        return res.send({
            Status: 0,
            Message: "Unauthorized User"
        });
    }
    next();
};


websiteroutes.post('/register', websiteregister)
websiteroutes.post('/verify-register', verifyregister)
websiteroutes.put('/resend-otp', resendotp)
websiteroutes.post('/login', logincontroller)
websiteroutes.get('/view-profile', websitesession, verifytoken, upload, viewprofile)
websiteroutes.post('/check-web-session', checkwebsession)
websiteroutes.post('/logout', websitesession, verifytoken, upload, weblogout)
websiteroutes.post('/create-profile', websitesession, verifytoken, upload, createprofilecontroller)
websiteroutes.get('/view-notice', verifytoken, websitesession, upload, viewnotices)
websiteroutes.get('/view-certificates', verifytoken, websitesession, upload, viewcertificates)
websiteroutes.post('/membership-order-id', verifytoken, websitesession, upload, generatemembershipoderid)

websiteroutes.post('/donation-now', upload, generateindividualdonationorderid)
websiteroutes.post('/verify-donate-now',upload, verifyindividualdonationpayment)

websiteroutes.post('/donation-order-id', verifytoken, websitesession, upload, generatedonationorderid)

websiteroutes.post('/verify-membership', verifytoken, websitesession, upload, verifymembershippayment)
websiteroutes.post('/verify-donations', verifytoken, websitesession, upload, viewfydonationpayment)

websiteroutes.post('/view-all-donations', verifytoken, websitesession, upload, viewalldonationstransactions)
websiteroutes.post('/view-all-memberships', verifytoken, websitesession, upload, viewallmembershiptransactions)

websiteroutes.put('/update-profile-data', verifytoken, websitesession, upload, updateprofile)

updateprofile
websiteroutes.get('/verify-membership', verifytoken, websitesession, upload, viewmembershipstatus)

websiteroutes.post('/forgot-password', forgotpassword)
websiteroutes.put('/change-password', websitesession, verifytoken, updatepassword)

module.exports = websiteroutes