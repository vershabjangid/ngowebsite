const fs = require('fs')
let path = require('path')
const newsbannermodel = require('../model/news/NewsBannerModel')
const newsmodel = require('../model/news/NewsModel')
const newstextraparagraphmodel = require('../model/news/NewsAddExtraParagraph')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "https://api.shriraghavleela.org/uploads/"

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






exports.addnewsextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await newsmodel.findOne({ _id: req.body.News_Section_Id })
        if (viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "News section required"
            })
        }
        else {
            let data = {
                News_Section_Id: req.body.News_Section_Id,
                News_Paragraph: req.body.News_Paragraph,
                News_Sub_Heading: req.body.News_Sub_Heading,
                News_Image: req.files[0] === undefined ? null : req.files[0].filename
            }


            let insertdata = await newstextraparagraphmodel(data)
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



exports.viewnewstextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await newstextraparagraphmodel.find();
        res.send({ viewdata, imageurl })
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}





exports.deletenewsextraparagraphcontroller = async (req, res) => {
    try {
        let viewdata = await newstextraparagraphmodel.findOne({ _id: req.body._id })
        if (viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "Data doesn't exists"
            })
        }
        else {
            if (viewdata.News_Image === null) {
                let deletedata = await newstextraparagraphmodel.deleteOne({ _id: viewdata._id })
                if (deletedata.deletedCount >= 1) {
                    res.send({
                        Status: 1,
                        Message: "Data deleted successfully"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Data doesn't deleted"
                    })
                }
            }
            else {
                let deletedata = await newstextraparagraphmodel.deleteOne({ _id: viewdata._id })
                if (deletedata.deletedCount >= 1) {
                    fs.unlinkSync(`${finalpath}/${viewdata.News_Image}`)
                    res.send({
                        Status: 1,
                        Message: "Data deleted successfully"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Data doesn't deleted"
                    })
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






exports.updatenewsextraparagraphcontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            let viewdata = await newstextraparagraphmodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                News_Section_Id: req.body.News_Section_Id === null || req.body.News_Section_Id === '' ? viewdata.News_Section_Id : req.body.News_Section_Id,
                News_Sub_Heading: req.body.News_Sub_Heading === null || req.body.News_Sub_Heading === '' ? viewdata.News_Sub_Heading : req.body.News_Sub_Heading,
                News_Paragraph: req.body.News_Paragraph === null || req.body.News_Paragraph === '' ? viewdata.News_Paragraph : req.body.News_Paragraph,
            }
            console.log(data)
            let updatedata = await newstextraparagraphmodel.updateOne({ _id: data._id }, {
                News_Section_Id: data.News_Section_Id,
                News_Sub_Heading: data.News_Sub_Heading,
                News_Paragraph: data.News_Paragraph
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
            let viewdata = await newstextraparagraphmodel.findOne({ _id: req.body._id })

            let data = {
                _id: req.body._id,
                News_Section_Id: req.body.News_Section_Id === null || req.body.News_Section_Id === '' ? viewdata.News_Section_Id : req.body.News_Section_Id,
                News_Sub_Heading: req.body.News_Sub_Heading === null || req.body.News_Sub_Heading === '' ? viewdata.News_Sub_Heading : req.body.News_Sub_Heading,
                News_Paragraph: req.body.News_Paragraph === null || req.body.News_Paragraph === '' ? viewdata.News_Paragraph : req.body.News_Paragraph,
                News_Image: req.files[0].filename
            }


            let updatedata = await newstextraparagraphmodel.updateOne({ _id: data._id }, {
                News_Section_Id: data.News_Section_Id,
                News_Sub_Heading: data.News_Sub_Heading,
                News_Paragraph: data.News_Paragraph,
                News_Image: data.News_Image
            })


            if (updatedata.modifiedCount >= 1) {
                if (viewdata.News_Image === null) {
                    res.send({
                        Status: 1,
                        Message: "Data Updated Successfully"
                    })
                }
                else {
                    fs.unlinkSync(`${finalpath}/${viewdata.News_Image}`)
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
