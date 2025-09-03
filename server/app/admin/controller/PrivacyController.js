const fs = require('fs')
let path = require('path')
const privacybannermodel = require('../model/privacypolicy/PrivacyAddBanner')
const privacyparagraphmodel = require('../model/privacypolicy/PrivacyAddParagraph')
const privacyextraparagraphmodel = require('../model/privacypolicy/PrivacyAddExtraParagraph')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"


exports.addprivacybannercontroller = async (req, res) => {
    try {
        let viewdata = await privacybannermodel.find()
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
                Privacy_Banner_Heading: req.body.Privacy_Banner_Heading,
                Privacy_Banner_Description: req.body.Privacy_Banner_Description,
                Privacy_Banner_Image: req.files[0].filename
            }


            let insertdata = await privacybannermodel(data)
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




exports.viewprivacybannercontroller = async (req, res) => {
    try {
        let viewdata = await privacybannermodel.find();
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





exports.updateprivacybannercontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await privacybannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Privacy_Banner_Heading: req.body.Privacy_Banner_Heading === null || req.body.Privacy_Banner_Heading === '' ? viewdata.Privacy_Banner_Heading : req.body.Privacy_Banner_Heading,
                Privacy_Banner_Description: req.body.Privacy_Banner_Description === null || req.body.Privacy_Banner_Description === '' ? viewdata.Privacy_Banner_Description : req.body.Privacy_Banner_Description
            }

            let updatedata = await privacybannermodel.updateOne({ _id: data._id }, {
                Privacy_Banner_Heading: data.Privacy_Banner_Heading,
                Privacy_Banner_Description: data.Privacy_Banner_Description
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
            let viewdata = await privacybannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Privacy_Banner_Heading: req.body.Privacy_Banner_Heading === null || req.body.Privacy_Banner_Heading === '' ? viewdata.Privacy_Banner_Heading : req.body.Privacy_Banner_Heading,
                Privacy_Banner_Description: req.body.Privacy_Banner_Description === null || req.body.Privacy_Banner_Description === '' ? viewdata.Privacy_Banner_Description : req.body.Privacy_Banner_Description,
                Privacy_Banner_Image: req.files[0].filename
            }


            let updatedata = await privacybannermodel.updateOne({ _id: data._id }, {
                Privacy_Banner_Heading: data.Privacy_Banner_Heading,
                Privacy_Banner_Description: data.Privacy_Banner_Description,
                Privacy_Banner_Image: data.Privacy_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Privacy_Banner_Image}`)
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









exports.addprivacyparagraphsection = async (req, res) => {
    try {
        let data = {
            Privacy_Heading: req.body.Privacy_Heading,
            Privacy_Description: req.body.Privacy_Description,
            Privacy_Image: req.files[0] !== undefined ? req.files[0].filename : null
        }


        let insertdata = await privacyparagraphmodel(data)
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





exports.viewprivacyparagraphsection = async (req, res) => {
    try {
        let viewdata = await privacyparagraphmodel.find();
        let imgurl = imageurl

        console.log(viewdata)
        res.send({ viewdata, imgurl })

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}






exports.updateprivacyparagraphsection = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            let viewdata = await privacyparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                Privacy_Heading: req.body.Privacy_Heading === null || req.body.Privacy_Heading === '' ? viewdata.Privacy_Heading : req.body.Privacy_Heading,
                Privacy_Description: req.body.Privacy_Description === null || req.body.Privacy_Description === '' ? viewdata.Privacy_Description : req.body.Privacy_Description
            }

            let updatedata = await privacyparagraphmodel.updateOne({ _id: data._id }, {
                Privacy_Heading: data.Privacy_Heading,
                Privacy_Description: data.Privacy_Description
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
            let viewdata = await privacyparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                Privacy_Heading: req.body.Privacy_Heading === null || req.body.Privacy_Heading === '' ? viewdata.Privacy_Heading : req.body.Privacy_Heading,
                Privacy_Description: req.body.Privacy_Description === null || req.body.Privacy_Description === '' ? viewdata.Privacy_Description : req.body.Privacy_Description,
                Privacy_Image: req.files[0].filename
            }

            let updatedata = await privacyparagraphmodel.updateOne({ _id: data._id }, {
                Privacy_Heading: data.Privacy_Heading,
                Privacy_Description: data.Privacy_Description,
                Privacy_Image: data.Privacy_Image
            })


            if (updatedata.modifiedCount >= 1) {
                if (viewdata.Privacy_Image === null) {
                    res.send({
                        Status: 1,
                        Message: "Data Updated Successfully"
                    })
                }
                else {
                    fs.unlinkSync(`${finalpath}/${viewdata.Privacy_Image}`)
                    res.send({
                        Status: 1,
                        Message: "Data Updated Successfully"
                    })
                }
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
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}








exports.deleteprivacyparagraphsection = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Privacy_Image: req.body.Privacy_Image
        }

        let viewdata = await privacyparagraphmodel.findOne({ _id: req.body._id })
        let deletedata = await privacyparagraphmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            let deletedata = await privacyextraparagraphmodel.deleteMany({ Privacy_Section_Id: data._id })
            if (viewdata.Privacy_Image === null) {
                res.send({
                    Status: 1,
                    Message: "Data Deleted Successfully"
                })
            }
            else {
                res.send({
                    Status: 1,
                    Message: "Data Deleted Successfully"
                })
                fs.unlinkSync(`${finalpath}/${req.body.Privacy_Image}`)
            }
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







exports.addprivacyextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await privacyparagraphmodel.findOne({ _id: req.body.Privacy_Section_Id })
        if (viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "Terms section required"
            })
        }
        else {
            let data = {
                Privacy_Section_Id: req.body.Privacy_Section_Id,
                Privacy_Paragraph: req.body.Privacy_Paragraph
            }


            let insertdata = await privacyextraparagraphmodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Data inserted successfully"
                    })
                })
                .catch((error) => {
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




exports.viewprivacyextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await privacyextraparagraphmodel.find();
        console.log(viewdata)
        res.send({ viewdata })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}







exports.updateprivacyextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await privacyextraparagraphmodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Privacy_Section_Id: req.body.Privacy_Section_Id === null || req.body.Privacy_Section_Id === '' ? viewdata.Privacy_Section_Id : req.body.Privacy_Section_Id,
            Privacy_Paragraph: req.body.Privacy_Paragraph === null || req.body.Privacy_Paragraph === '' ? viewdata.Privacy_Paragraph : req.body.Privacy_Paragraph
        }
        console.log(data)
        let updatedata = await privacyextraparagraphmodel.updateOne({ _id: data._id }, {
            Privacy_Section_Id: data.Privacy_Section_Id,
            Privacy_Paragraph: data.Privacy_Paragraph
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
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.deleteprivacyextraparagraphcontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deletedata = await privacyextraparagraphmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
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
