const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const os = require('os');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path');
const registermodel = require('../model/RegisterModel');
const createprofilemodel = require('../model/CreateProfileModel');
const membershippaymentsmodel = require('../model/MembershipPaymentModal');
const { isNumber } = require('razorpay/dist/utils/razorpay-utils');
let finalpath = path.join(__dirname, "../../../uploads")
require('dotenv').config();
let imageurl = "http://localhost:5500/uploads/"



const transporter = nodemailer.createTransport({
    host: process.env.EMAILSMTP,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAILADDRESS,
        pass: process.env.EMAILPASSKEY,
    },
});

// Wrap in an async IIFE so we can use await.
let main = async (value) => {
    try {
        const info = await transporter.sendMail({
            from: "ShriRam Navyug Trust",
            to: value.Email,
            subject: "Your One-Time Password (OTP)",
            text: "Hello world?", // plain‑text body
            html: `
         <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2c3e50;">One-Time Password (OTP) Verification</h2>
        <p>Dear User,</p>
        <p>As part of our security process, please use the following one-time password (OTP) to complete your verification:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #2c3e50; letter-spacing: 4px;">
            ${value.OTP_Value}
          </span>
        </div>
        <p>This OTP is valid for the next <strong>5 minutes</strong>. Do not share this code with anyone for security reasons.</p>
        <p>If you did not request this code, please ignore this email or contact our support team immediately.</p>
        <p>Best regards,<br/>
        The ShriRam Navyug Trust</p>
        <hr style="margin-top: 30px;">
        <p style="font-size: 12px; color: #888888;">This is an automated message. Please do not reply directly to this email.</p>
      </div>
        `, // HTML body
        });

        console.log("Message sent:", info.messageId);
    }
    catch (error) {
        console.log("somthing went wrong")
    }
};


exports.websiteregister = async (req, res) => {
    try {
        let data = {
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: await bcrypt.hash(req.body.Password, 10),
            OTP_Value: Math.floor(1000 + Math.random() * 8000),
            Expired_In: Date.now() + 5 * 60 * 1000,
            Is_Verified: false
        }

        let viewregister = await registermodel.findOne({ Email: data.Email, Is_Verified: false })

        if (viewregister !== null) {
            let updatedata = await registermodel.updateOne({ _id: viewregister._id }, { Password: data.Password, Phone: data.Phone, OTP_Value: data.OTP_Value })
            if (updatedata.modifiedCount > 0) {
                res.send({
                    Status: 1,
                    Message: "OTP Sended Successfully"
                })
                main(data)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Please try after some time"
                })
            }
        }
        else {
            if (data.Email.includes('@') && data.Email.includes('.') && data.Phone.length == 10 && data.Email !== " " && data.Phone !== " ") {
                let insertdata = await registermodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "OTP Sended Successfully"
                        })
                        main(data)
                    })
                    .catch((error) => {
                        if (error.code === 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data Missing"
                            })
                        }
                    })
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data Missing"
                })
            }
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something Went Wrong"
        })
    }
}

function getIPv4Address() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }

    return 'IPv4 address not found';
}


exports.verifyregister = async (req, res) => {
    try {
        let data = {
            Email: req.body.Email,
            OTP_Value: req.body.OTP_Value,
        }

        let viewdata = await registermodel.findOne({ Email: data.Email, OTP_Value: data.OTP_Value })
        if (viewdata !== null) {
            if (Date.now() > viewdata.Expired_In) {
                res.send({
                    Status: 0,
                    Message: "OTP Expired"
                })

            }
            else {
                let newtoken;
                jwt.sign({ newtoken }, process.env.WEBJWTTOKEN, { expiresIn: "2h" }, (err, value) => {
                    if (err) {
                        res.send({
                            Status: 0,
                            Message: "Please try after sometime",
                        })
                    }
                    else {
                        req.session.user = viewdata._id
                        res.send({
                            Status: 1,
                            Message: "Verification Success",
                            Token: value
                        })

                    }
                })
            }
        }
        else {
            res.send({
                Status: 0,
                Message: "Invalid OTP"
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



async function updateverification(value) {
    try {
        let data = {
            _id: value,
            Is_Verified: true
        }

        let updatedata = await registermodel.updateOne({ _id: data._id }, { Is_Verified: data.Is_Verified })
        if (updatedata.modifiedCount === 1) {
            return 0;
        }
        else {
            return 0;
        }
    }
    catch (error) {
        return 0;
    }
}


exports.resendotp = async (req, res) => {

    try {
        let data = {
            Email: req.body.Email,
            OTP_Value: Math.floor(1000 + Math.random() * 8000),
            Expired_In: Date.now() + 5 * 60 * 1000,
        }

        let updatedata = await registermodel.updateOne({ Email: data.Email }, { OTP_Value: data.OTP_Value, Expired_In: data.Expired_In })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "OTP Sended Successfully"
            })
            main(data)
        }
        else {
            res.send({
                Status: 0,
                Message: "OTP Doesn't Sended"
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







exports.createprofilecontroller = async (req, res) => {
    try {

        let date = new Date()
        let birthdate = new Date(req.body.Date_Of_Birth)
        let age = date.getFullYear() - birthdate.getFullYear();
        let monthdiff = date.getMonth() - birthdate.getMonth();

        if (monthdiff < 0 || (monthdiff < 0 && date.getDate() < birthdate.getDate())) {
            age--
        }

        if (age >= 18) {
            if (req.files[0] !== undefined && req.files[1] !== undefined) {
                if (!req.files[0].filename.includes('.fake') && !req.files[1].filename.includes('.fake')) {
                    if (req.body.Aadhar_NO.length === 12 && Number(req.body.Aadhar_NO) !== NaN) {
                        let searchregister = await registermodel.findOne({ Email: req.body.Email })
                        if (searchregister !== null) {
                            let data = {
                                Sub_Id: searchregister._id,
                                User_ID: "SRT-" + Math.floor(Math.random() * 10000),
                                Full_Name: req.body.Full_Name,
                                Father_Name: req.body.Father_Name,
                                Occupation: req.body.Occupation,
                                Date_Of_Birth: req.body.Date_Of_Birth,
                                Address: req.body.Address,
                                Aadhar_NO: req.body.Aadhar_NO,
                                Upload_Aadhar: req.files[0].filename,
                                City: req.body.City,
                                Select_Designation: req.body.Select_Designation,
                                Profile_Picture: req.files[1].filename,
                                Shapath: req.body.Shapath
                            }

                            let insertdata = await createprofilemodel(data)
                            insertdata.save()
                                .then(() => {
                                    res.send({
                                        Status: 1,
                                        Message: 'Profile Created Successfully'
                                    })
                                    updateverification(data.Sub_Id)
                                })
                                .catch((error) => {
                                    if (error.code === 11000) {
                                        res.send({
                                            Status: 0,
                                            Message: 'Data Already Exists'

                                        })
                                    }
                                    else {
                                        res.send({
                                            Status: 0,
                                            Message: 'Data Missing'
                                        })
                                    }
                                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                                    fs.unlinkSync(`${finalpath}/${req.files[1].filename}`)
                                })
                        }
                        else {
                            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                            fs.unlinkSync(`${finalpath}/${req.files[1].filename}`)
                            res.send({
                                Status: 0,
                                Message: 'User not found'
                            })
                        }
                    }
                    else {
                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                        fs.unlinkSync(`${finalpath}/${req.files[1].filename}`)
                        res.send({
                            Status: 0,
                            Message: 'Invalid AadharCard Number'
                        })
                    }
                }
                else {
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    fs.unlinkSync(`${finalpath}/${req.files[1].filename}`)
                    res.send({
                        Status: 0,
                        Message: 'Invalid File'
                    })
                }
            }
            else {
                if (req.files[0] === undefined) {
                    res.send({
                        Status: 0,
                        Message: 'Data Missing'
                    })
                }
                else {
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    res.send({
                        Status: 0,
                        Message: 'Data Missing'
                    })
                }
            }
        }
        else {
            if (req.files[0] === undefined) {
                res.send({
                    Status: 0,
                    Message: 'Minimum 18 year required'
                })
            }
            else {
                for (var i = 0; i < req.files.length; i++) {
                    fs.unlinkSync(`${finalpath}/${req.files[i].filename}`)
                }
                res.send({
                    Status: 0,
                    Message: 'Minimum 18 year required'
                })
            }
        }
    }
    catch (error) {
        if (req.files[0] === undefined) {
            res.send({
                Status: 0,
                Message: "Something Went Wrong"
            })
        }
        else {
            for (var i = 0; i < req.files.length; i++) {
                fs.unlinkSync(`${finalpath}/${req.files[i].filename}`)
            }
            res.send({
                Status: 0,
                Message: "Something Went Wrong"
            })
        }
    }
}


exports.logincontroller = async (req, res) => {
    try {
        let data = {
            Email: req.body.Email,
            Password: req.body.Password
        }

        let viewdata = await registermodel.findOne({ Email: data.Email })
        if (viewdata !== null) {
            let match = await bcrypt.compare(data.Password, viewdata.Password)
            if (match === false) {
                res.send({
                    Status: 0,
                    Message: "Incorrect Email or Password"
                })
            }
            else {
                if (viewdata.Is_Verified === 1) {
                    //         let update = await membershippaymentsmodel.find({ User_Id: viewdata._id })
                    // console.log(update)
                    let newtoken;
                    jwt.sign({ newtoken }, process.env.WEBJWTTOKEN, { expiresIn: "2h" }, (err, value) => {
                        if (err) {
                            res.send({
                                Status: 0,
                                Message: "Please try after sometime",
                            })
                        }
                        else {
                            req.session.user = viewdata._id
                            res.send({
                                _id: viewdata._id,
                                Status: 1,
                                Message: "Login Successfully",
                                Token: value
                            })
                        }
                    })
                }
                else {
                    res.send({
                        Status: 2,
                        Message: "OTP Sended Successfully "
                    })
                    loginresend(req.body.Email)
                }
            }
        }
        else {
            res.send({
                Status: 0,
                Message: "Incorrect Email or Password"
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

async function loginresend(value) {
    try {
        let data = {
            Email: value,
            OTP_Value: Math.floor(1000 + Math.random() * 8000),
            Expired_In: Date.now() + 5 * 60 * 1000,
        }

        let updatedata = await registermodel.updateOne({ Email: data.Email }, { OTP_Value: data.OTP_Value, Expired_In: data.Expired_In })
        if (updatedata.modifiedCount === 1) {
            main(data)
        }
        else {
            return 0;
        }
    }
    catch (error) {
        return 0;
    }
}

exports.checkwebsession = async (req, res) => {
    if (req.session.user !== undefined) {
        res.send({
            Status: 1,
            Message: "Session Active"
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "Session Expired"
        })
    }
}



exports.forgotpassword = async (req, res) => {
    try {
        let data = {
            Email: req.body.Email
        }

        let viewdata = await registermodel.findOne({ Email: data.Email })
        if (viewdata === null) {
            res.send({
                Status: 0,
                Message: "User Doesn't Exists"
            })
        }
        else {
            res.send({
                Status: 1,
                Message: "OTP Sended Successfully"
            })
            updateotp(data.Email)
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something Went Wrong"
        })
    }
}



async function updateotp(value, res) {
    try {
        let data = {
            Email: value,
            OTP_Value: Math.floor(1000 + Math.random() * 8000),
            Expired_In: Date.now() + 5 * 60 * 1000,
        }

        let updatedata = await registermodel.updateOne({ Email: data.Email }, { OTP_Value: data.OTP_Value, Expired_In: data.Expired_In })
        if (updatedata.modifiedCount === 1) {
            main(data)
        }
        else {
            return 0;
        }
    }
    catch (error) {
        return 0;
    }
}



exports.updatepassword = async (req, res) => {
    try {
        let data = {
            Email: req.body.Email,
            Password: await bcrypt.hash(req.body.Password, 10)
        }


        let updatedata = await registermodel.updateOne({ Email: data.Email }, { Password: data.Password })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Password Changed Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Password Doesn't Changed"
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




exports.weblogout = (req, res) => {
    try {
        let token = req.headers['authorization']
        let decode = jwt.decode(token)
        if (decode.exp !== undefined || decode.exp !== null) {
            decode.exp = 0
            req.session.user = undefined
            res.send({
                Status: 1,
                Message: "Logout Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Unable to Logout"
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

exports.viewprofile = async (req, res) => {
    try {
        let viewregister = await registermodel.findOne({ _id: req.session.user }).select(['-Password', '-OTP_Value', '-Expired_In', '-Is_Verified'])
        let viewdata = await createprofilemodel.findOne({ Sub_Id: req.session.user }).select(['-Aadhar_NO', '-Upload_Aadhar'])
        let viewmembership = await membershippaymentsmodel.findOne({ User_Id: req.session.user, Status: "Paid" })

        if (viewmembership !== null) {
            res.send({ viewregister, viewdata, imageurl })
        }
        else {
            let viewdata = await createprofilemodel.findOne({ Sub_Id: req.session.user }).select(['-Aadhar_NO', '-Upload_Aadhar', '-Father_Name', '-Occupation', '-Date_Of_Birth', '-Address', '-Aadhar_NO', '-Upload_Aadhar', '-City', '-Select_Designation', '-Profile_Picture', '-User_ID'])
            res.send({
                viewregister,
                viewdata,
                Status: 2,
                Message: "Membership is required"
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



exports.viewallusers = async (req, res) => {
    try {
        let viewdata = await createprofilemodel.find();
        let data = viewdata.flatMap((e) => e.Sub_Id)
        let finaldata = [...data]
        let viewprofile = await registermodel.find({ _id: { $in: finaldata } }).select(['-OTP_Value', '-Expired_In', '-Is_Verified', '-Password'])
        res.send({ viewdata, viewprofile, imageurl })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.updateprofile = async (req, res) => {
    try {
        let finddata = await createprofilemodel.findOne({ Sub_Id: req.session.user })
        if (req.files[0] === undefined) {
            if (finddata === null) {
                res.send({
                    Status: 0,
                    Message: "Data Not Found"
                })
            }
            else {

                let date = new Date()
                let birthdate = new Date(req.body.Date_Of_Birth)
                let age = date.getFullYear() - birthdate.getFullYear();
                let monthdiff = date.getMonth() - birthdate.getMonth();

                if (monthdiff < 0 || (monthdiff < 0 && date.getDate() < birthdate.getDate())) {
                    age--
                }

                if (age >= 18) {
                    let data = {
                        Sub_Id: finddata.Sub_id,
                        Full_Name: req.body.Full_Name === "" || req.body.Full_Name === null ? finddata.Full_Name : req.body.Full_Name,
                        Father_Name: req.body.Father_Name === "" || req.body.Father_Name === null ? finddata.Father_Name : req.body.Father_Name,
                        Occupation: req.body.Occupation === "" || req.body.Occupation === null ? finddata.Occupation : req.body.Occupation,
                        Date_Of_Birth: req.body.Date_Of_Birth === "" || req.body.Date_Of_Birth === null ? finddata.Date_Of_Birth : req.body.Date_Of_Birth,
                        Address: req.body.Address === "" || req.body.Address === null ? finddata.Address : req.body.Address,
                        City: req.body.City === "" || req.body.City === null ? finddata.City : req.body.City,
                        Select_Designation: req.body.Select_Designation === "" || req.body.Select_Designation === null ? finddata.Select_Designation : req.body.Select_Designation
                    }

                    let updateprofile = await createprofilemodel.updateOne({ Sub_Id: req.session.user }, {
                        Full_Name: data.Full_Name,
                        Father_Name: data.Father_Name,
                        Occupation: data.Occupation,
                        Date_Of_Birth: data.Date_Of_Birth,
                        Address: data.Address,
                        City: data.City,
                        Select_Designation: data.Select_Designation
                    })


                    if (updateprofile.modifiedCount > 0) {
                        res.send({
                            Status: 1,
                            Message: "Data Updated Successfully"
                        })
                    }
                    else {
                        res.send({
                            Status: 0,
                            Message: "Data Doesn't Updated"
                        })
                    }
                }
                else {
                    res.send({
                        Status: 0,
                        Message: 'Minimum 18 year required'
                    })
                }
            }
        }
        else {
            let date = new Date()
            let birthdate = new Date(req.body.Date_Of_Birth)
            let age = date.getFullYear() - birthdate.getFullYear();
            let monthdiff = date.getMonth() - birthdate.getMonth();

            if (monthdiff < 0 || (monthdiff < 0 && date.getDate() < birthdate.getDate())) {
                age--
            }

            if (age >= 18) {
                if (finddata === null) {
                    res.send({
                        Status: 0,
                        Message: "Data Not Found"
                    })
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                }
                else {
                    let data = {
                        Sub_Id: finddata.Sub_id,
                        Full_Name: req.body.Full_Name === "" || req.body.Full_Name === null ? finddata.Full_Name : req.body.Full_Name,
                        Father_Name: req.body.Father_Name === "" || req.body.Father_Name === null ? finddata.Father_Name : req.body.Father_Name,
                        Occupation: req.body.Occupation === "" || req.body.Occupation === null ? finddata.Occupation : req.body.Occupation,
                        Date_Of_Birth: req.body.Date_Of_Birth === "" || req.body.Date_Of_Birth === null ? finddata.Date_Of_Birth : req.body.Date_Of_Birth,
                        Address: req.body.Address === "" || req.body.Address === null ? finddata.Address : req.body.Address,
                        City: req.body.City === "" || req.body.City === null ? finddata.City : req.body.City,
                        Select_Designation: req.body.Select_Designation === "" || req.body.Select_Designation === null ? finddata.Select_Designation : req.body.Select_Designation,
                        Profile_Picture: req.files[0].filename
                    }

                    let updateprofile = await createprofilemodel.updateOne({ Sub_Id: req.session.user }, {
                        Full_Name: data.Full_Name,
                        Father_Name: data.Father_Name,
                        Occupation: data.Occupation,
                        Date_Of_Birth: data.Date_Of_Birth,
                        Address: data.Address,
                        City: data.City,
                        Select_Designation: data.Select_Designation,
                        Profile_Picture: data.Profile_Picture
                    })


                    if (updateprofile.modifiedCount > 0) {
                        res.send({
                            Status: 1,
                            Message: "Data Updated Successfully"
                        })
                        fs.unlinkSync(`${finalpath}/${finddata.Profile_Picture}`)
                    }
                    else {
                        res.send({
                            Status: 0,
                            Message: "Data Doesn't Updated"
                        })
                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    }
                }
            }
            else {
                res.send({
                    Status: 0,
                    Message: 'Minimum 18 year required'
                })
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
        }
    }
    catch (error) {
        if (req.files[0] !== undefined) {
            res.send({
                Status: 0,
                Message: "Something Went Wrong"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
        else {
            res.send({
                Status: 0,
                Message: "Something Went Wrong"
            })
        }
    }
}





//  if (req.files[0] === undefined) {
//             let updatedata = await registermodel.findOne({ _id: req.session.user })
//             if (updatedata === null) {
//                 res.send({
//                     Status: 0,
//                     Message: "Data Not Found"
//                 })
//             }
//             else {
//                 let data = {
//
//                 }
//

//             }
//         }
//         else {
//             let updatedata = await registermodel.findOne({ _id: req.session.user })
//             if (updatedata === null || req.files[0].filename.includes(".fake")) {
//                 res.send({
//                     Status: 0,
//                     Message: "Data Not Found"
//                 })
//                 fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
//             }
//             else {
//                 let data = {
//                     Sub_Id: updatedata._id,
//                     Full_Name: req.body.Full_Name,
//                     Father_Name: req.body.Father_Name,
//                     Occupation: req.body.Occupation,
//                     Date_Of_Birth: req.body.Date_Of_Birth,
//                     Address: req.body.Address,
//                     City: req.body.City,
//                     Select_Designation: req.body.Select_Designation,
//                     Profile_Picture: req.files[0].filename
//                 }
//                 let viewprofile = await createprofilemodel.findOne({ Sub_Id: data.Sub_Id })
//                 let updateprofile = await createprofilemodel.updateOne({ Sub_Id: data.Sub_Id }, {
//                     Full_Name: data.Full_Name,
//                     Father_Name: data.Father_Name,
//                     Occupation: data.Occupation,
//                     Date_Of_Birth: data.Date_Of_Birth,
//                     Address: data.Address,
//                     City: data.City,
//                     Select_Designation: data.Select_Designation,
//                     Profile_Picture: data.Profile_Picture
//                 })

//                 if (updateprofile.modifiedCount > 0) {
//                     res.send({
//                         Status: 1,
//                         Message: "Data Updated Successfully"
//                     })
//                     fs.unlinkSync(`${finalpath}/${viewprofile.Profile_Picture}`)
//                 }
//                 else {
//                     res.send({
//                         Status: 0,
//                         Message: "Data Doesn't Updated"
//                     })
//                     fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
//                 }
//             }
//         }