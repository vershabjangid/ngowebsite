const fs = require('fs')
let path = require('path')
const homegalleryimagesdatamodel = require('../model/gallery/HomeGalleryModal')
const gallerybannermodel = require('../model/gallery/AboutAddGallery')
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"



exports.addgallerybannercontroller = async (req, res) => {
    try {
        let viewdata = await gallerybannermodel.find()
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
                Gallery_Banner_Heading: req.body.Gallery_Banner_Heading,
                Gallery_Banner_Description: req.body.Gallery_Banner_Description,
                Gallery_Banner_Image: req.files[0].filename
            }


            let insertdata = await gallerybannermodel(data)
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






exports.viewgallerybannercontroller = async (req, res) => {
    try {
        let viewdata = await gallerybannermodel.find();
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



exports.updategallerybannercontroller = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await gallerybannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Gallery_Banner_Heading: req.body.Gallery_Banner_Heading === null || req.body.Gallery_Banner_Heading === '' ? viewdata.Gallery_Banner_Heading : req.body.Gallery_Banner_Heading,
                Gallery_Banner_Description: req.body.Gallery_Banner_Description === null || req.body.Gallery_Banner_Description === '' ? viewdata.Gallery_Banner_Description : req.body.Gallery_Banner_Description
            }

            let updatedata = await gallerybannermodel.updateOne({ _id: data._id }, {
                Gallery_Banner_Heading: data.Gallery_Banner_Heading,
                Gallery_Banner_Description: data.Gallery_Banner_Description
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
            let viewdata = await gallerybannermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Gallery_Banner_Heading: req.body.Gallery_Banner_Heading === null || req.body.Gallery_Banner_Heading === '' ? viewdata.Gallery_Banner_Heading : req.body.Gallery_Banner_Heading,
                Gallery_Banner_Description: req.body.Gallery_Banner_Description === null || req.body.Gallery_Banner_Description === '' ? viewdata.Gallery_Banner_Description : req.body.Gallery_Banner_Description,
                Gallery_Banner_Image: req.files[0].filename
            }


            let updatedata = await gallerybannermodel.updateOne({ _id: data._id }, {
                Gallery_Banner_Heading: data.Gallery_Banner_Heading,
                Gallery_Banner_Description: data.Gallery_Banner_Description,
                Gallery_Banner_Image: data.Gallery_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Gallery_Banner_Image}`)
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






exports.addhomegallery = async (req, res) => {
    try {
        if (req.files[0] !== undefined) {
            if (req.files[0].filename.includes('.fake')) {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let data = {
                    Gallery_Event_Heading: req.body.Gallery_Event_Heading,
                    Gallery_Event_Description: req.body.Gallery_Event_Description,
                    Gallery_Event_Image: req.files[0].filename
                }
                console.log(data)
                let insertdata = await homegalleryimagesdatamodel(data)
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



exports.viewhomegallery = async (req, res) => {
    try {
        let viewdata = await homegalleryimagesdatamodel.find();
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



exports.deletehomegallery = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Gallery_Event_Heading: req.body.Gallery_Event_Heading,
            Gallery_Event_Description: req.body.Gallery_Event_Description,
            Gallery_Event_Image: req.body.Gallery_Event_Image
        }
        let deletedata = await homegalleryimagesdatamodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.Gallery_Event_Image}`)
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








exports.updatehomegallery = async (req, res) => {
    try {
        if (req.files[0] === undefined) {

            let viewdata = await homegalleryimagesdatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Gallery_Event_Heading: req.body.Gallery_Event_Heading === null || req.body.Gallery_Event_Heading === '' ? viewdata.Gallery_Event_Heading : req.body.Gallery_Event_Heading,
                Gallery_Event_Description: req.body.Gallery_Event_Description === null || req.body.Gallery_Event_Description === '' ? viewdata.Gallery_Event_Description : req.body.Gallery_Event_Description
            }

            let updatedata = await homegalleryimagesdatamodel.updateOne({ _id: data._id }, {
                Gallery_Event_Heading: data.Gallery_Event_Heading,
                Gallery_Event_Description: data.Gallery_Event_Description
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
            let viewdata = await homegalleryimagesdatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Gallery_Event_Heading: req.body.Gallery_Event_Heading === null || req.body.Gallery_Event_Heading === '' ? viewdata.Gallery_Event_Heading : req.body.Gallery_Event_Heading,
                Gallery_Event_Description: req.body.Gallery_Event_Description === null || req.body.Gallery_Event_Description === '' ? viewdata.Gallery_Event_Description : req.body.Gallery_Event_Description,
                Gallery_Event_Image: req.files[0].filename
            }


            let updatedata = await homegalleryimagesdatamodel.updateOne({ _id: data._id }, {
                Gallery_Event_Heading: data.Gallery_Event_Heading,
                Gallery_Event_Description: data.Gallery_Event_Description,
                Gallery_Event_Image: data.Gallery_Event_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Gallery_Event_Image}`)
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
