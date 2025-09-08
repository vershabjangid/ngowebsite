const certificatemodel = require("../model/CertificateModel");
const createprofilemodel = require("../model/CreateProfileModel")
const fs = require('fs')
let path = require('path')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://localhost:5500/uploads/"

exports.addcertificates = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            res.send({
                Status: 0,
                Message: "Data Missing"
            })
        }
        else {
            if (req.files[0].filename.includes('.fake')) {
                res.send({
                    Status: 0,
                    Message: "Unsupported file format"
                })
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let data = {
                    Certificate_Heading: req.body.Certificate_Heading,
                    Certificate_Description: req.body.Certificate_Description,
                    Certificate_Category: req.body.Certificate_Category,
                    Certificate_ID: "CERT-" + Math.floor(Math.random() * 10000),
                    Date_Of_Issue: req.body.Date_Of_Issue,
                    Send_To: req.body.Send_To,
                    Certificate_File: req.files[0].filename
                }

                let viewdata = await createprofilemodel.findOne({ Sub_Id: data.Send_To })
                if (viewdata !== null) {
                    let insertdata = await certificatemodel(data);
                    insertdata.save()
                        .then(() => {
                            res.send({
                                Status: 1,
                                Message: "Data Inserted Successfully"
                            })
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
                            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                        })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "User not found"
                    })
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                }
            }
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.viewadmincertificate = async (req, res) => {
    try {
        let viewdata = await certificatemodel.find().sort({ _id: -1 })
        res.send({ viewdata, imageurl })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.updatecertificate = async (req, res) => {
    try {
        let viewdata = await certificatemodel.findOne({ _id: req.body._id })
        if (req.files[0] === undefined) {
            let data = {
                _id: req.body._id,
                Certificate_Heading: req.body.Certificate_Heading === null || req.body.Certificate_Heading === '' ? viewdata.Certificate_Heading : req.body.Certificate_Heading,
                Certificate_Description: req.body.Certificate_Description === null || req.body.Certificate_Description === '' ? viewdata.Certificate_Description : req.body.Certificate_Description,
                Certificate_Category: req.body.Certificate_Category === null || req.body.Certificate_Category === '' ? viewdata.Certificate_Category : req.body.Certificate_Category,
                Certificate_ID: req.body.Certificate_ID === null || req.body.Certificate_ID === '' ? viewdata.Certificate_ID : req.body.Certificate_ID,
                Date_Of_Issue: req.body.Date_Of_Issue === null || req.body.Date_Of_Issue === '' ? viewdata.Date_Of_Issue : req.body.Date_Of_Issue
            }

            let updatedata = await certificatemodel.updateOne({ _id: data._id }, {
                Certificate_Heading: data.Certificate_Heading,
                Certificate_Description: data.Certificate_Description,
                Certificate_Category: data.Certificate_Category,
                Certificate_ID: data.Certificate_ID,
                Date_Of_Issue: data.Date_Of_Issue
            })
            if (updatedata.modifiedCount >= 1) {
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data doesn't updated"
                })
            }
        }
        else {
            let data = {
                _id: req.body._id,
                Certificate_Heading: req.body.Certificate_Heading === null || req.body.Certificate_Heading === '' ? viewdata.Certificate_Heading : req.body.Certificate_Heading,
                Certificate_Description: req.body.Certificate_Description === null || req.body.Certificate_Description === '' ? viewdata.Certificate_Description : req.body.Certificate_Description,
                Certificate_Category: req.body.Certificate_Category === null || req.body.Certificate_Category === '' ? viewdata.Certificate_Category : req.body.Certificate_Category,
                Certificate_ID: req.body.Certificate_ID === null || req.body.Certificate_ID === '' ? viewdata.Certificate_ID : req.body.Certificate_ID,
                Date_Of_Issue: req.body.Date_Of_Issue === null || req.body.Date_Of_Issue === '' ? viewdata.Date_Of_Issue : req.body.Date_Of_Issue,
                Certificate_File: req.files[0].filename
            }

            let updatedata = await certificatemodel.updateOne({ _id: data._id }, {
                Certificate_Heading: data.Certificate_Heading,
                Certificate_Description: data.Certificate_Description,
                Certificate_Category: data.Certificate_Category,
                Certificate_ID: data.Certificate_ID,
                Date_Of_Issue: data.Date_Of_Issue,
                Certificate_File: data.Certificate_File

            })
            if (updatedata.modifiedCount >= 1) {
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                fs.unlinkSync(`${finalpath}/${viewdata.Certificate_File}`)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data doesn't updated"
                })
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
        }
    }
    catch (error) {
        if (req.files[0] === undefined) {
            res.send({
                Status: 0,
                Message: "Something went wrong"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Something went wrong"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
    }
}







exports.deletecertificate = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }
        let viewdata = await certificatemodel.findOne({ _id: data._id })
        let deletedata = await certificatemodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            fs.unlinkSync(`${finalpath}/${viewdata.Certificate_File}`)
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data doesn't deleted"
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





exports.viewcertificates = async (req, res) => {
    try {
        let viewdata = await certificatemodel.find({ Send_To: req.session.user }).sort({ _id: -1 })
        res.send({ viewdata, imageurl })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}