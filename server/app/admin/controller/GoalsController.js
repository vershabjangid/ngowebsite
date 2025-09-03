const fs = require('fs')
let path = require('path')
const homegoalscardmodel = require('../model/goals/GoalsCardModal')
const homegoalsaddheadingmodel = require('../model/goals/GoalsAddHeadingModel')
const homegoalsparagraphmodel = require('../model/goals/GoalsAddParagraphModel')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"




exports.addhomegoalscard = async (req, res) => {
    try {
        if (req.files[0] !== undefined) {
            if (req.files[0].filename.includes('.fake')) {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let data = {
                    Home_Goals_Heading: req.body.Home_Goals_Heading,
                    Home_Goals_Description: req.body.Home_Goals_Description,
                    Home_Goals_Card_Icon: req.files[0].filename
                }

                let viewdata = await homegoalscardmodel.find({ Home_Goals_Heading: data.Home_Goals_Heading })
                if (viewdata.length === 0) {
                    let insertdata = await homegoalscardmodel(data)
                    insertdata.save()
                        .then(() => {
                            res.send({
                                Status: 1,
                                Message: "Data Inserted Successfully"
                            })
                        })
                        .catch((error) => {
                            if (req.files[0] === undefined) {
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
                            }
                            else {
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
                            }
                        })
                }
                else {
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    res.send({
                        Status: 0,
                        Message: "Data Already Exists"
                    })
                }
            }
        }
        else {
            if (req.files[0] === undefined) {
                res.send({
                    Status: 0,
                    Message: "Data Missing"
                })
            }
            else {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                res.send({
                    Status: 0,
                    Message: "Data Missing"
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



exports.viewgoalscarddata = async (req, res) => {
    try {
        let viewdata = await homegoalscardmodel.find();
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



exports.deletehomegoalscard = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Home_Goals_Heading: req.body.Home_Goals_Heading,
            Home_Goals_Description: req.body.Home_Goals_Description,
            Home_Goals_Card_Icon: req.body.Home_Goals_Card_Icon
        }
        let deletedata = await homegoalscardmodel.deleteOne({ _id: data._id })
        let deleteheading = await homegoalsaddheadingmodel.deleteOne({ Home_Card_Id: data._id })
        let deleteparagraph = await homegoalsparagraphmodel.deleteMany({ Home_Card_Content_Id: data._id })
        if (deletedata.deletedCount >= 1 || deleteheading.deletedCount >= 1 || deleteparagraph.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.Home_Goals_Card_Icon}`)
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


exports.updatehomegoalscard = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await homegoalscardmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                Home_Goals_Heading: req.body.Home_Goals_Heading === null || req.body.Home_Goals_Heading === '' ? viewdata.Home_Goals_Heading : req.body.Home_Goals_Heading,
                Home_Goals_Description: req.body.Home_Goals_Description === null || req.body.Home_Goals_Description === '' ? viewdata.Home_Goals_Description : req.body.Home_Goals_Description
            }

            let updatedata = await homegoalscardmodel.updateOne({ _id: data._id }, {
                Home_Goals_Heading: data.Home_Goals_Heading,
                Home_Goals_Description: data.Home_Goals_Description
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
            let viewdata = await homegoalscardmodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Goals_Heading: req.body.Home_Goals_Heading === null || req.body.Home_Goals_Heading === '' ? viewdata.Home_Goals_Heading : req.body.Home_Goals_Heading,
                Home_Goals_Description: req.body.Home_Goals_Description === null || req.body.Home_Goals_Description === '' ? viewdata.Home_Goals_Description : req.body.Home_Goals_Description,
                Home_Goals_Card_Icon: req.files[0].filename
            }


            let updatedata = await homegoalscardmodel.updateOne({ _id: data._id }, {
                Home_Goals_Heading: data.Home_Goals_Heading,
                Home_Goals_Description: data.Home_Goals_Description,
                Home_Goals_Card_Icon: data.Home_Goals_Card_Icon
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Home_Goals_Card_Icon}`)
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





exports.addgoalsparagraphheading = async (req, res) => {
    try {
        let data = {
            Home_Card_Id: req.body.Home_Card_Id,
            Home_Card_Paragraph_Heading: req.body.Home_Card_Paragraph_Heading
        }

        let insertdata = await homegoalsaddheadingmodel(data)
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
            })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.viewgoalsparagraphheading = async (req, res) => {
    try {
        let viewdata = await homegoalsaddheadingmodel.find();
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




exports.deletegoalsparagraphheading = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        let deleteheading = await homegoalsaddheadingmodel.deleteOne({ _id: data._id })
        let deletedata = await homegoalsparagraphmodel.deleteMany({ Home_Card_Content_Heading: data._id })
        if (deleteheading.deletedCount >= 1 || deletedata.deletedCount >= 1) {
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





exports.updategoalsparagraphheading = async (req, res) => {
    try {
        let viewdata = await homegoalsaddheadingmodel.findOne({ _id: req.body._id })

        let data = {
            _id: req.body._id,
            Home_Card_Id: req.body.Home_Card_Id === null || req.body.Home_Card_Id === '' ? viewdata.Home_Card_Id : req.body.Home_Card_Id,
            Home_Card_Paragraph_Heading: req.body.Home_Card_Paragraph_Heading === null || req.body.Home_Card_Paragraph_Heading === '' ? viewdata.Home_Card_Paragraph_Heading : req.body.Home_Card_Paragraph_Heading
        }

        let updatedata = await homegoalsaddheadingmodel.updateOne({ _id: data._id }, {
            Home_Card_Id: data.Home_Card_Id,
            Home_Card_Paragraph_Heading: data.Home_Card_Paragraph_Heading
        })

        let updateparagraph = await homegoalsparagraphmodel.updateMany({ Home_Card_Content_Heading: data._id }, {
            Home_Card_Content_Heading: data._id
        })
        if (updateparagraph.modifiedCount >= 1 || updatedata.modifiedCount >= 1) {
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



exports.addgoalscardparagraph = async (req, res) => {
    try {
        let data = {
            Home_Card_Content_Id: req.body.Home_Card_Content_Id,
            Home_Card_Content_Heading: req.body.Home_Card_Content_Heading,
            Home_Card_Content_Paragraph: req.body.Home_Card_Content_Paragraph,
        }

        let insertdata = await homegoalsparagraphmodel(data)
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
            })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}




exports.viewgoalscardparagraph = async (req, res) => {
    try {
        let viewdata = await homegoalsparagraphmodel.find();
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




exports.deletegoalscardparagraph = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }
        console.log(data)
        let deletedata = await homegoalsparagraphmodel.deleteOne({ _id: data._id })
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







exports.updategoalscardparagraph = async (req, res) => {
    try {
        console.log(req.body)
        let viewdata = await homegoalsparagraphmodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Home_Card_Content_Id: req.body.Home_Card_Content_Id === null || req.body.Home_Card_Content_Id === '' ? viewdata.Home_Card_Content_Id : req.body.Home_Card_Content_Id,
            Home_Card_Content_Heading: req.body.Home_Card_Content_Heading === null || req.body.Home_Card_Content_Heading === '' ? viewdata.Home_Card_Content_Heading : req.body.Home_Card_Content_Heading,
            Home_Card_Content_Paragraph: req.body.Home_Card_Content_Paragraph === null || req.body.Home_Card_Content_Paragraph === '' ? viewdata.Home_Card_Content_Paragraph : req.body.Home_Card_Content_Paragraph
        }

        let updatedata = await homegoalsparagraphmodel.updateOne({ _id: data._id }, {
            Home_Card_Content_Id: data.Home_Card_Content_Id,
            Home_Card_Content_Heading: data.Home_Card_Content_Heading,
            Home_Card_Content_Paragraph: data.Home_Card_Content_Paragraph
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