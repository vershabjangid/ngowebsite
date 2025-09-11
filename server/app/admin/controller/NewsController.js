const fs = require('fs')
let path = require('path')
const newsbannermodel = require('../model/news/NewsBannerModel')
const newsmodel = require('../model/news/NewsModel')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"

exports.addnewsbannercontroller = async (req, res) => {
    try {
        let viewdata = await newsbannermodel.find()
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
                News_Banner_Heading: req.body.News_Banner_Heading,
                News_Banner_Description: req.body.News_Banner_Description,
                News_Banner_Image: req.files[0].filename
            }


            let insertdata = await newsbannermodel(data)
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






exports.viewnewsbannercontroller = async (req, res) => {
    try {
        let viewdata = await newsbannermodel.find();
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



exports.updatenewsbannercontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await newsbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                News_Banner_Heading: req.body.News_Banner_Heading === null || req.body.News_Banner_Heading === '' ? viewdata.News_Banner_Heading : req.body.News_Banner_Heading,
                News_Banner_Description: req.body.News_Banner_Description === null || req.body.News_Banner_Description === '' ? viewdata.News_Banner_Description : req.body.News_Banner_Description
            }

            let updatedata = await newsbannermodel.updateOne({ _id: data._id }, {
                News_Banner_Heading: data.News_Banner_Heading,
                News_Banner_Description: data.News_Banner_Description
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
            let viewdata = await newsbannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                News_Banner_Heading: req.body.News_Banner_Heading === null || req.body.News_Banner_Heading === '' ? viewdata.News_Banner_Heading : req.body.News_Banner_Heading,
                News_Banner_Description: req.body.News_Banner_Description === null || req.body.News_Banner_Description === '' ? viewdata.News_Banner_Description : req.body.News_Banner_Description,
                News_Banner_Image: req.files[0].filename
            }


            let updatedata = await newsbannermodel.updateOne({ _id: data._id }, {
                News_Banner_Heading: data.News_Banner_Heading,
                News_Banner_Description: data.News_Banner_Description,
                News_Banner_Image: data.News_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.News_Banner_Image}`)
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


















exports.addnewscontroller = async (req, res) => {
    try {
        let data = {
            News_Heading: req.body.News_Heading,
            News_Description: req.body.News_Description,
            News_Image: req.files[0].filename,
            News_Additional_Links: req.body.News_Additional_Links,
            News_Date: Date.now()
        }

        let insertdata = await newsmodel(data)
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








exports.viewnewscontroller = async (req, res) => {
    try {
        let viewdata = await newsmodel.find().sort({ _id: -1 });
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





exports.updatenewscontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await newsmodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                News_Heading: req.body.News_Heading === null || req.body.News_Heading === '' ? viewdata.News_Heading : req.body.News_Heading,
                News_Description: req.body.News_Description === null || req.body.News_Description === '' ? viewdata.News_Description : req.body.News_Description,
                News_Additional_Links: req.body.News_Additional_Links === null || req.body.News_Additional_Links === '' ? viewdata.News_Additional_Links : req.body.News_Additional_Links
            }

            let updatedata = await newsmodel.updateOne({ _id: data._id }, {
                News_Heading: data.News_Heading,
                News_Description: data.News_Description,
                News_Additional_Links: data.News_Additional_Links
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
            let viewdata = await newsmodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                News_Heading: req.body.News_Heading === null || req.body.News_Heading === '' ? viewdata.News_Heading : req.body.News_Heading,
                News_Description: req.body.News_Description === null || req.body.News_Description === '' ? viewdata.News_Description : req.body.News_Description,
                News_Image: req.files[0].filename,
                News_Additional_Links: req.body.News_Additional_Links === null || req.body.News_Additional_Links === '' ? viewdata.News_Additional_Links : req.body.News_Additional_Links
            }


            let updatedata = await newsmodel.updateOne({ _id: data._id }, {
                News_Heading: data.News_Heading,
                News_Description: data.News_Description,
                News_Image: data.News_Image,
                News_Additional_Links: data.News_Additional_Links
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.News_Image}`)
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




exports.deletenewscontroller = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            News_Image: req.body.News_Image,
        }
        let deletedata = await newsmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.News_Image}`)
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

