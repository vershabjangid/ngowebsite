const fs = require('fs')
let path = require('path')
const contactbannermodel = require('../model/contact/ContactBannerModel')
const queriesmodel = require('../model/contact/DashQueries')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"

exports.addcontactbannercontroller = async (req, res) => {
    try {
        let viewdata = await contactbannermodel.find()
        if (viewdata.length !== 0) {
            if (req.files[0] !== undefined) {
                res.send({
                    Status: 0,
                    Message: "Data already exists"
                })
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data already exists"
                })
            }
        }
        else {
            let data = {
                Contact_Banner_Heading: req.body.Contact_Banner_Heading,
                Contact_Banner_Description: req.body.Contact_Banner_Description,
                Contact_Banner_Image: req.files[0].filename
            }


            let insertdata = await contactbannermodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Data inserted successfully"
                    })
                })
                .catch((error) => {
                    if (req.files[0] !== undefined) {
                        if (error.code === 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data already exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data missing"
                            })
                        }
                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    }
                    else {
                        if (error.code === 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data already exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data missing"
                            })
                        }
                    }
                })
        }
    }
    catch (error) {
        if (req.files[0] !== undefined) {
            res.send({
                Status: 0,
                Message: "Something went wrong"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
        else {
            res.send({
                Status: 0,
                Message: "Something went wrong"
            })
        }

    }
}





exports.viewcontactbannercontroller = async (req, res) => {
    try {
        let viewdata = await contactbannermodel.find();
        let imgurl = imageurl

        res.send({ viewdata, imgurl })

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}




exports.updatecontactbannercontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await contactbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Contact_Banner_Heading: req.body.Contact_Banner_Heading === null || req.body.Contact_Banner_Heading === '' ? viewdata.Contact_Banner_Heading : req.body.Contact_Banner_Heading,
                Contact_Banner_Description: req.body.Contact_Banner_Description === null || req.body.Contact_Banner_Description === '' ? viewdata.Contact_Banner_Description : req.body.Contact_Banner_Description
            }

            let updatedata = await contactbannermodel.updateOne({ _id: data._id }, {
                Contact_Banner_Heading: data.Contact_Banner_Heading,
                Contact_Banner_Description: data.Contact_Banner_Description
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
            let viewdata = await contactbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Contact_Banner_Heading: req.body.Contact_Banner_Heading === null || req.body.Contact_Banner_Heading === '' ? viewdata.Contact_Banner_Heading : req.body.Contact_Banner_Heading,
                Contact_Banner_Description: req.body.Contact_Banner_Description === null || req.body.Contact_Banner_Description === '' ? viewdata.Contact_Banner_Description : req.body.Contact_Banner_Description,
                Contact_Banner_Image: req.files[0].filename
            }


            let updatedata = await contactbannermodel.updateOne({ _id: data._id }, {
                Contact_Banner_Heading: data.Contact_Banner_Heading,
                Contact_Banner_Description: data.Contact_Banner_Description,
                Contact_Banner_Image: data.Contact_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Contact_Banner_Image}`)
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
    }
    catch (error) {
        if (req.files[0] === undefined) {
            res.send({
                Status: 0,
                Message: "Something went wrong"
            })
        }
        else {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Something went wrong"
            })
        }
    }
}






exports.AddQueriescontroller = async (req, res) => {
    try {
        let viewdata = await queriesmodel.findOne({ Email: req.body.Email, Phone: req.body.Phone })
        if (viewdata !== null) {
            res.send({
                Status: 0,
                Message: "Query Already Exists"
            })
        }
        else {
            let data = {
                Full_Name: req.body.Full_Name,
                Phone: req.body.Phone,
                Email: req.body.Email,
                Message: req.body.Message
            }


            let insertdata = await queriesmodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Query Submitted Successfully"
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



exports.ViewQueriescontroller = async (req, res) => {
    try {
        let viewdata = await queriesmodel.find().sort({ _id: -1 });
        let imgurl = imageurl

        res.send({ viewdata, imgurl })

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}





exports.deletequeries = async (req, res) => {

    try {
        let data = {
            _id: req.body._id
        }
        let deletedata = await queriesmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount > 0) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doensn't Deleted"
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