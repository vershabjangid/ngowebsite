const aboutbannermodel = require("../model/about/AboutAddBanner")
const aboutextraparagraphmodel = require("../model/about/AboutAddExtraParagraph")
const aboutparagraphmodel = require("../model/about/AboutAddParagraph")
const fs = require('fs')
let path = require('path')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"


exports.addaboutbannercontroller = async (req, res) => {
    try {
        let viewdata = await aboutbannermodel.find()
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
                About_Banner_Heading: req.body.About_Banner_Heading,
                About_Banner_Description: req.body.About_Banner_Description,
                About_Banner_Image: req.files[0].filename
            }


            let insertdata = await aboutbannermodel(data)
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




exports.viewaboutbannercontroller = async (req, res) => {
    try {
        let viewdata = await aboutbannermodel.find();
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





exports.updateaboutbannercontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await aboutbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                About_Banner_Heading: req.body.About_Banner_Heading === null || req.body.About_Banner_Heading === '' ? viewdata.About_Banner_Heading : req.body.About_Banner_Heading,
                About_Banner_Description: req.body.About_Banner_Description === null || req.body.About_Banner_Description === '' ? viewdata.About_Banner_Description : req.body.About_Banner_Description
            }

            let updatedata = await aboutbannermodel.updateOne({ _id: data._id }, {
                About_Banner_Heading: data.About_Banner_Heading,
                About_Banner_Description: data.About_Banner_Description
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
            let viewdata = await aboutbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                About_Banner_Heading: req.body.About_Banner_Heading === null || req.body.About_Banner_Heading === '' ? viewdata.About_Banner_Heading : req.body.About_Banner_Heading,
                About_Banner_Description: req.body.About_Banner_Description === null || req.body.About_Banner_Description === '' ? viewdata.About_Banner_Description : req.body.About_Banner_Description,
                About_Banner_Image: req.files[0].filename
            }


            let updatedata = await aboutbannermodel.updateOne({ _id: data._id }, {
                About_Banner_Heading: data.About_Banner_Heading,
                About_Banner_Description: data.About_Banner_Description,
                About_Banner_Image: data.About_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.About_Banner_Image}`)
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









exports.addaboutparagraphsection = async (req, res) => {
    try {
        let data = {
            About_Heading: req.body.About_Heading,
            About_Description: req.body.About_Description,
            About_Image: req.files[0] !== undefined ? req.files[0].filename : null
        }


        let insertdata = await aboutparagraphmodel(data)
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





exports.viewaboutparagraphsection = async (req, res) => {
    try {
        let viewdata = await aboutparagraphmodel.find();
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






exports.updateaboutparagraphsection = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            let viewdata = await aboutparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                About_Heading: req.body.About_Heading === null || req.body.About_Heading === '' ? viewdata.About_Heading : req.body.About_Heading,
                About_Description: req.body.About_Description === null || req.body.About_Description === '' ? viewdata.About_Description : req.body.About_Description
            }

            let updatedata = await aboutparagraphmodel.updateOne({ _id: data._id }, {
                About_Heading: data.About_Heading,
                About_Description: data.About_Description
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
            let viewdata = await aboutparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                About_Heading: req.body.About_Heading === null || req.body.About_Heading === '' ? viewdata.About_Heading : req.body.About_Heading,
                About_Description: req.body.About_Description === null || req.body.About_Description === '' ? viewdata.About_Description : req.body.About_Description,
                About_Image: req.files[0].filename
            }

            let updatedata = await aboutparagraphmodel.updateOne({ _id: data._id }, {
                About_Heading: data.About_Heading,
                About_Description: data.About_Description,
                About_Image: data.About_Image
            })


            if (updatedata.modifiedCount >= 1) {
                if (viewdata.About_Image === null) {
                    res.send({
                        Status: 1,
                        Message: "Data Updated Successfully"
                    })
                }
                else {
                    fs.unlinkSync(`${finalpath}/${viewdata.About_Image}`)
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








exports.deleteaboutparagraphsection = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            About_Image: req.body.About_Image
        }

        let viewdata = await aboutparagraphmodel.findOne({ _id: req.body._id })
        let deletedata = await aboutparagraphmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            let deletedata = await aboutextraparagraphmodel.deleteMany({ About_Section_Id: data._id })
            if (viewdata.About_Image === null) {
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
                fs.unlinkSync(`${finalpath}/${req.body.About_Image}`)
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







exports.addaboutextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await aboutparagraphmodel.findOne({ _id: req.body.About_Section_Id })
        if (viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "About section required"
            })
        }
        else {
            let data = {
                About_Section_Id: req.body.About_Section_Id,
                About_Paragraph: req.body.About_Paragraph
            }


            let insertdata = await aboutextraparagraphmodel(data)
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




exports.viewaboutextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await aboutextraparagraphmodel.find();
        res.send({ viewdata })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}







exports.updateaboutextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await aboutextraparagraphmodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            About_Section_Id: req.body.About_Section_Id === null || req.body.About_Section_Id === '' ? viewdata.About_Section_Id : req.body.About_Section_Id,
            About_Paragraph: req.body.About_Paragraph === null || req.body.About_Paragraph === '' ? viewdata.About_Paragraph : req.body.About_Paragraph
        }

        let updatedata = await aboutextraparagraphmodel.updateOne({ _id: data._id }, {
            About_Section_Id: data.About_Section_Id,
            About_Paragraph: data.About_Paragraph
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



exports.deleteaboutextraparagraphcontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }
        console.log(data)
        let deletedata = await aboutextraparagraphmodel.deleteOne({ _id: data._id })
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
