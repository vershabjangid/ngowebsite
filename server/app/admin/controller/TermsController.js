const fs = require('fs')
let path = require('path')
const termsbannermodel = require("../model/terms/TermsAddBanner")
const termsparagraphmodel = require("../model/terms/TermsAddParagraph")
const termsextraparagraphmodel = require("../model/terms/TermsAddExtraParagraph")
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"


exports.addtermsbannercontroller = async (req, res) => {
    try {
        let viewdata = await termsbannermodel.find()
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
                Terms_Banner_Heading: req.body.Terms_Banner_Heading,
                Terms_Banner_Description: req.body.Terms_Banner_Description,
                Terms_Banner_Image: req.files[0].filename
            }


            let insertdata = await termsbannermodel(data)
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




exports.viewtermsbannercontroller = async (req, res) => {
    try {
        let viewdata = await termsbannermodel.find();
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





exports.updatetermsbannercontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await termsbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Terms_Banner_Heading: req.body.Terms_Banner_Heading === null || req.body.Terms_Banner_Heading === '' ? viewdata.Terms_Banner_Heading : req.body.Terms_Banner_Heading,
                Terms_Banner_Description: req.body.Terms_Banner_Description === null || req.body.Terms_Banner_Description === '' ? viewdata.Terms_Banner_Description : req.body.Terms_Banner_Description
            }

            let updatedata = await termsbannermodel.updateOne({ _id: data._id }, {
                Terms_Banner_Heading: data.Terms_Banner_Heading,
                Terms_Banner_Description: data.Terms_Banner_Description
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
            let viewdata = await termsbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Terms_Banner_Heading: req.body.Terms_Banner_Heading === null || req.body.Terms_Banner_Heading === '' ? viewdata.Terms_Banner_Heading : req.body.Terms_Banner_Heading,
                Terms_Banner_Description: req.body.Terms_Banner_Description === null || req.body.Terms_Banner_Description === '' ? viewdata.Terms_Banner_Description : req.body.Terms_Banner_Description,
                Terms_Banner_Image: req.files[0].filename
            }


            let updatedata = await termsbannermodel.updateOne({ _id: data._id }, {
                Terms_Banner_Heading: data.Terms_Banner_Heading,
                Terms_Banner_Description: data.Terms_Banner_Description,
                Terms_Banner_Image: data.Terms_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Terms_Banner_Image}`)
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









exports.addtermsparagraphsection = async (req, res) => {
    try {
        let data = {
            Terms_Heading: req.body.Terms_Heading,
            Terms_Description: req.body.Terms_Description,
            Terms_Image: req.files[0] !== undefined ? req.files[0].filename : null
        }


        let insertdata = await termsparagraphmodel(data)
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





exports.viewtermsparagraphsection = async (req, res) => {
    try {
        let viewdata = await termsparagraphmodel.find();
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






exports.updatetermsparagraphsection = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            let viewdata = await termsparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                Terms_Heading: req.body.Terms_Heading === null || req.body.Terms_Heading === '' ? viewdata.Terms_Heading : req.body.Terms_Heading,
                Terms_Description: req.body.Terms_Description === null || req.body.Terms_Description === '' ? viewdata.Terms_Description : req.body.Terms_Description
            }

            let updatedata = await termsparagraphmodel.updateOne({ _id: data._id }, {
                Terms_Heading: data.Terms_Heading,
                Terms_Description: data.Terms_Description
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
            let viewdata = await termsparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                Terms_Heading: req.body.Terms_Heading === null || req.body.Terms_Heading === '' ? viewdata.Terms_Heading : req.body.Terms_Heading,
                Terms_Description: req.body.Terms_Description === null || req.body.Terms_Description === '' ? viewdata.Terms_Description : req.body.Terms_Description,
                Terms_Image: req.files[0].filename
            }

            let updatedata = await termsparagraphmodel.updateOne({ _id: data._id }, {
                Terms_Heading: data.Terms_Heading,
                Terms_Description: data.Terms_Description,
                Terms_Image: data.Terms_Image
            })


            if (updatedata.modifiedCount >= 1) {
                if (viewdata.Terms_Image === null) {
                    res.send({
                        Status: 1,
                        Message: "Data Updated Successfully"
                    })
                }
                else {
                    fs.unlinkSync(`${finalpath}/${viewdata.Terms_Image}`)
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








exports.deletetermsparagraphsection = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Terms_Image: req.body.Terms_Image
        }

        let viewdata = await termsparagraphmodel.findOne({ _id: req.body._id })
        let deletedata = await termsparagraphmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            let deletedata = await termsextraparagraphmodel.deleteMany({ Terms_Section_Id: data._id })
            if (viewdata.Terms_Image === null) {
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
                fs.unlinkSync(`${finalpath}/${req.body.Terms_Image}`)
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







exports.addtermsextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await termsparagraphmodel.findOne({ _id: req.body.Terms_Section_Id })
        if (viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "Terms section required"
            })
        }
        else {
            let data = {
                Terms_Section_Id: req.body.Terms_Section_Id,
                Terms_Paragraph: req.body.Terms_Paragraph
            }


            let insertdata = await termsextraparagraphmodel(data)
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




exports.viewtermsextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await termsextraparagraphmodel.find();
        res.send({ viewdata })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}







exports.updatetermsextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await termsextraparagraphmodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Terms_Section_Id: req.body.Terms_Section_Id === null || req.body.Terms_Section_Id === '' ? viewdata.Terms_Section_Id : req.body.Terms_Section_Id,
            Terms_Paragraph: req.body.Terms_Paragraph === null || req.body.Terms_Paragraph === '' ? viewdata.Terms_Paragraph : req.body.Terms_Paragraph
        }
        console.log(data)
        let updatedata = await termsextraparagraphmodel.updateOne({ _id: data._id }, {
            Terms_Section_Id: data.Terms_Section_Id,
            Terms_Paragraph: data.Terms_Paragraph
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



exports.deletetermsextraparagraphcontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }
        console.log(data)
        let deletedata = await termsextraparagraphmodel.deleteOne({ _id: data._id })
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
