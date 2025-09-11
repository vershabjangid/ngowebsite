const homebannerslidesmodel = require("../model/HomeBannerModal")
const fs = require('fs')
let path = require('path')
const homeaboutdatamodel = require("../model/HomeAboutModal")
const homegoalsdatamodel = require("../model/HomeGoalsModal")
const homeManagementdatamodel = require("../model/HomeManagementModal")
const homemanagementprofiledatamodel = require("../model/HomeOurManagementProfileModal")
const homegallerydatamodel = require("../model/HomeGalleryModal")
const hometeammembermodel = require("../model/HomeTeamMemberDataModel")
const hometeamprofiledatamodel = require("../model/HomeTeamProfileModel")
const homedonationmodel = require("../model/HomeDonationModal")
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://194.238.22.240:5500/uploads/"


exports.addhomebanner = async (req, res) => {
    try {
        if (req.files[0] !== undefined) {
            if (req.files[0].filename.includes('.fake')) {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let data = {
                    Home_Banner_Heading: req.body.Home_Banner_Heading,
                    Home_Banner_Description: req.body.Home_Banner_Description,
                    Home_Banner_Image: req.files[0].filename
                }

                let insertdata = await homebannerslidesmodel(data)
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


exports.viewhomebanner = async (req, res) => {
    try {
        let viewdata = await homebannerslidesmodel.find();
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

exports.deletehomebanner = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Home_Banner_Heading: req.body.Home_Banner_Heading,
            Home_Banner_Description: req.body.Home_Banner_Description,
            Home_Banner_Image: req.body.Home_Banner_Image
        }
        let deletedata = await homebannerslidesmodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.Home_Banner_Image}`)
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


exports.updatehomebannerslides = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            console.log(req.body)
            let viewdata = await homebannerslidesmodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Banner_Heading: req.body.Home_Banner_Heading === null || req.body.Home_Banner_Heading === '' ? viewdata.Home_Banner_Heading : req.body.Home_Banner_Heading,
                Home_Banner_Description: req.body.Home_Banner_Description === null || req.body.Home_Banner_Description === '' ? viewdata.Home_Banner_Description : req.body.Home_Banner_Description
            }

            let updatedata = await homebannerslidesmodel.updateOne({ _id: data._id }, {
                Home_Banner_Heading: data.Home_Banner_Heading,
                Home_Banner_Description: data.Home_Banner_Description
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
            let viewdata = await homebannerslidesmodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Banner_Heading: req.body.Home_Banner_Heading === null || req.body.Home_Banner_Heading === '' ? viewdata.Home_Banner_Heading : req.body.Home_Banner_Heading,
                Home_Banner_Description: req.body.Home_Banner_Description === null || req.body.Home_Banner_Description === '' ? viewdata.Home_Banner_Description : req.body.Home_Banner_Description,
                Home_Banner_Image: req.files[0].filename
            }


            let updatedata = await homebannerslidesmodel.updateOne({ _id: data._id }, {
                Home_Banner_Heading: data.Home_Banner_Heading,
                Home_Banner_Description: data.Home_Banner_Description,
                Home_Banner_Image: data.Home_Banner_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Home_Banner_Image}`)
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





// home about section 


exports.addhomeaboutdata = async (req, res) => {
    try {
        let viewdata = await homeaboutdatamodel.find()
        if (viewdata.length !== 0) {
            if (req.files[0] === undefined) {
                res.send({
                    Status: 0,
                    Message: "Data already exists"
                })
            }
            else {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                res.send({
                    Status: 0,
                    Message: "Data already exists"
                })
            }
        }
        else {
            if (req.files[0] !== undefined) {
                if (req.files[0].filename.includes('.fake')) {
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                }
                else {
                    let data = {
                        Home_About_Heading: req.body.Home_About_Heading,
                        Home_About_Description: req.body.Home_About_Description,
                        Home_About_Image: req.files[0].filename
                    }

                    let insertdata = await homeaboutdatamodel(data)
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



exports.viewhomeaboutdata = async (req, res) => {
    try {
        let viewdata = await homeaboutdatamodel.findOne();
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




exports.updateaboutdata = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            console.log(req.body)
            let viewdata = await homeaboutdatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_About_Heading: req.body.Home_About_Heading === null || req.body.Home_About_Heading === '' ? viewdata.Home_About_Heading : req.body.Home_About_Heading,
                Home_About_Description: req.body.Home_About_Description === null || req.body.Home_About_Description === '' ? viewdata.Home_About_Description : req.body.Home_About_Description
            }

            let updatedata = await homeaboutdatamodel.updateOne({ _id: data._id }, {
                Home_About_Heading: data.Home_About_Heading,
                Home_About_Description: data.Home_About_Description
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
            let viewdata = await homeaboutdatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_About_Heading: req.body.Home_About_Heading === null || req.body.Home_About_Heading === '' ? viewdata.Home_About_Heading : req.body.Home_About_Heading,
                Home_About_Description: req.body.Home_About_Description === null || req.body.Home_About_Description === '' ? viewdata.Home_About_Description : req.body.Home_About_Description,
                Home_About_Image: req.files[0].filename
            }


            let updatedata = await homeaboutdatamodel.updateOne({ _id: data._id }, {
                Home_About_Heading: data.Home_About_Heading,
                Home_About_Description: data.Home_About_Description,
                Home_About_Image: data.Home_About_Image
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Home_About_Image}`)
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



// add home goals 

exports.addhomegoalsdata = async (req, res) => {
    try {
        let viewdata = await homegoalsdatamodel.find()
        if (viewdata.length !== 0) {
            res.send({
                Status: 0,
                Message: "Data already exists"
            })
        }
        else {
            let data = {
                Home_Goals_Heading: req.body.Home_Goals_Heading,
                Home_Goals_Description: req.body.Home_Goals_Description,
            }

            let insertdata = await homegoalsdatamodel(data)
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

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}


exports.viewhomegoalsdata = async (req, res) => {
    try {
        let viewdata = await homegoalsdatamodel.findOne();
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




exports.updategoalsdata = async (req, res) => {
    try {

        let viewdata = await homegoalsdatamodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Home_Goals_Heading: req.body.Home_Goals_Heading === null || req.body.Home_Goals_Heading === '' ? viewdata.Home_Goals_Heading : req.body.Home_Goals_Heading,
            Home_Goals_Description: req.body.Home_Goals_Description === null || req.body.Home_Goals_Description === '' ? viewdata.Home_Goals_Description : req.body.Home_Goals_Description
        }

        let updatedata = await homegoalsdatamodel.updateOne({ _id: data._id }, {
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
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}





// add home management 

exports.addhomemanagementdata = async (req, res) => {
    try {
        let viewdata = await homeManagementdatamodel.find()
        if (viewdata.length !== 0) {
            res.send({
                Status: 0,
                Message: "Data already exists"
            })
        }

        else {
            let data = {
                Home_Management_Heading: req.body.Home_Management_Heading,
                Home_Management_Description: req.body.Home_Management_Description,
            }

            let insertdata = await homeManagementdatamodel(data)
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

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}


exports.viewhomemanagementdata = async (req, res) => {
    try {
        let viewdata = await homeManagementdatamodel.findOne();
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




exports.updatemanagementdata = async (req, res) => {
    try {

        let viewdata = await homeManagementdatamodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Home_Management_Heading: req.body.Home_Management_Heading === null || req.body.Home_Management_Heading === '' ? viewdata.Home_Management_Heading : req.body.Home_Management_Heading,
            Home_Management_Description: req.body.Home_Management_Description === null || req.body.Home_Management_Description === '' ? viewdata.Home_Management_Description : req.body.Home_Management_Description
        }

        let updatedata = await homeManagementdatamodel.updateOne({ _id: data._id }, {
            Home_Management_Heading: data.Home_Management_Heading,
            Home_Management_Description: data.Home_Management_Description
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



// add home management 


exports.addhomemanagementprofiledata = async (req, res) => {
    try {
        if (req.files[0] !== undefined) {
            if (req.files[0].filename.includes('.fake')) {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let data = {
                    Home_Management_Profile_Name: req.body.Home_Management_Profile_Name,
                    Home_Management_Profile_Designation: req.body.Home_Management_Profile_Designation,
                    Home_Management_Profile_Description: req.body.Home_Management_Profile_Description,
                    Home_Management_Profile_Picture: req.files[0].filename
                }

                let insertdata = await homemanagementprofiledatamodel(data)
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



exports.viewhomemanagementprofiledata = async (req, res) => {
    try {
        let viewdata = await homemanagementprofiledatamodel.find();
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



exports.updatehomemanagementprofiledata = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            console.log(req.body)
            let viewdata = await homemanagementprofiledatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Management_Profile_Name: req.body.Home_Management_Profile_Name === null || req.body.Home_Management_Profile_Name === '' ? viewdata.Home_Management_Profile_Name : req.body.Home_Management_Profile_Name,
                Home_Management_Profile_Designation: req.body.Home_Management_Profile_Designation === null || req.body.Home_Management_Profile_Designation === '' ? viewdata.Home_Management_Profile_Designation : req.body.Home_Management_Profile_Designation,
                Home_Management_Profile_Description: req.body.Home_Management_Profile_Description === null || req.body.Home_Management_Profile_Description === '' ? viewdata.Home_Management_Profile_Description : req.body.Home_Management_Profile_Description
            }

            let updatedata = await homemanagementprofiledatamodel.updateOne({ _id: data._id }, {
                Home_Management_Profile_Name: data.Home_Management_Profile_Name,
                Home_Management_Profile_Designation: data.Home_Management_Profile_Designation,
                Home_Management_Profile_Description: data.Home_Management_Profile_Description
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
            let viewdata = await homemanagementprofiledatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Management_Profile_Name: req.body.Home_Management_Profile_Name === null || req.body.Home_Management_Profile_Name === '' ? viewdata.Home_Management_Profile_Name : req.body.Home_Management_Profile_Name,
                Home_Management_Profile_Designation: req.body.Home_Management_Profile_Designation === null || req.body.Home_Management_Profile_Designation === '' ? viewdata.Home_Management_Profile_Designation : req.body.Home_Management_Profile_Designation,
                Home_Management_Profile_Description: req.body.Home_Management_Profile_Description === null || req.body.Home_Management_Profile_Description === '' ? viewdata.Home_Management_Profile_Description : req.body.Home_Management_Profile_Description,
                Home_Management_Profile_Picture: req.files[0].filename
            }


            let updatedata = await homemanagementprofiledatamodel.updateOne({ _id: data._id }, {
                Home_Management_Profile_Name: req.body.Home_Management_Profile_Name === null || req.body.Home_Management_Profile_Name === '' ? viewdata.Home_Management_Profile_Name : req.body.Home_Management_Profile_Name,
                Home_Management_Profile_Designation: req.body.Home_Management_Profile_Designation === null || req.body.Home_Management_Profile_Designation === '' ? viewdata.Home_Management_Profile_Designation : req.body.Home_Management_Profile_Designation,
                Home_Management_Profile_Description: req.body.Home_Management_Profile_Description === null || req.body.Home_Management_Profile_Description === '' ? viewdata.Home_Management_Profile_Description : req.body.Home_Management_Profile_Description,
                Home_Management_Profile_Picture: data.Home_Management_Profile_Picture
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Home_Management_Profile_Picture}`)
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



exports.deletehomemanagementprofiledata = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Home_Management_Profile_Name: req.body.Home_Management_Profile_Name,
            Home_Management_Profile_Designation: req.body.Home_Management_Profile_Designation,
            Home_Management_Profile_Description: req.body.Home_Management_Profile_Description,
            Home_Management_Profile_Picture: req.body.Home_Management_Profile_Picture,

        }
        let deletedata = await homemanagementprofiledatamodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.Home_Management_Profile_Picture}`)
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




// add home gallery 

exports.addhomegallerydata = async (req, res) => {
    try {
        let viewdata = await homegallerydatamodel.find()
        if (viewdata.length !== 0) {
            res.send({
                Status: 0,
                Message: "Data already exists"
            })
        }

        else {
            let data = {
                Home_Gallery_Heading: req.body.Home_Gallery_Heading,
                Home_Gallery_Description: req.body.Home_Gallery_Description,
            }

            let insertdata = await homegallerydatamodel(data)
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

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}


exports.viewhomegallerydata = async (req, res) => {
    try {
        let viewdata = await homegallerydatamodel.findOne();
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




exports.updategallerydata = async (req, res) => {
    try {

        let viewdata = await homegallerydatamodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Home_Gallery_Heading: req.body.Home_Gallery_Heading === null || req.body.Home_Gallery_Heading === '' ? viewdata.Home_Gallery_Heading : req.body.Home_Gallery_Heading,
            Home_Gallery_Description: req.body.Home_Gallery_Description === null || req.body.Home_Gallery_Description === '' ? viewdata.Home_Gallery_Description : req.body.Home_Gallery_Description
        }

        let updatedata = await homegallerydatamodel.updateOne({ _id: data._id }, {
            Home_Gallery_Heading: data.Home_Gallery_Heading,
            Home_Gallery_Description: data.Home_Gallery_Description
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








// add home teammember 

exports.addhometeammemberdata = async (req, res) => {
    try {
        let viewdata = await hometeammembermodel.find()
        if (viewdata.length !== 0) {
            res.send({
                Status: 0,
                Message: "Data already exists"
            })
        }

        else {
            let data = {
                Home_Team_Member_Heading: req.body.Home_Team_Member_Heading,
                Home_Team_Member_Description: req.body.Home_Team_Member_Description,
            }

            let insertdata = await hometeammembermodel(data)
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

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}


exports.viewhometeammemberdata = async (req, res) => {
    try {
        let viewdata = await hometeammembermodel.findOne();
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




exports.updateteammemberdata = async (req, res) => {
    try {

        let viewdata = await hometeammembermodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Home_Team_Member_Heading: req.body.Home_Team_Member_Heading === null || req.body.Home_Team_Member_Heading === '' ? viewdata.Home_Team_Member_Heading : req.body.Home_Team_Member_Heading,
            Home_Team_Member_Description: req.body.Home_Team_Member_Description === null || req.body.Home_Team_Member_Description === '' ? viewdata.Home_Team_Member_Description : req.body.Home_Team_Member_Description
        }

        let updatedata = await hometeammembermodel.updateOne({ _id: data._id }, {
            Home_Team_Member_Heading: data.Home_Team_Member_Heading,
            Home_Team_Member_Description: data.Home_Team_Member_Description
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















// add home team member 

exports.addhometeamprofiledata = async (req, res) => {
    try {
        if (req.files[0] !== undefined) {
            if (req.files[0].filename.includes('.fake')) {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let data = {
                    Home_Team_Profile_Name: req.body.Home_Team_Profile_Name,
                    Home_Team_Profile_Designation: req.body.Home_Team_Profile_Designation,
                    Home_Team_Profile_Description: req.body.Home_Team_Profile_Description,
                    Home_Team_Profile_Picture: req.files[0].filename
                }

                let insertdata = await hometeamprofiledatamodel(data)
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



exports.viewhometeamprofiledata = async (req, res) => {
    try {
        let viewdata = await hometeamprofiledatamodel.find();
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



exports.updatehometeamprofiledata = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            console.log(req.body)
            let viewdata = await hometeamprofiledatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Team_Profile_Name: req.body.Home_Team_Profile_Name === null || req.body.Home_Team_Profile_Name === '' ? viewdata.Home_Team_Profile_Name : req.body.Home_Team_Profile_Name,
                Home_Team_Profile_Designation: req.body.Home_Team_Profile_Designation === null || req.body.Home_Team_Profile_Designation === '' ? viewdata.Home_Team_Profile_Designation : req.body.Home_Team_Profile_Designation,
                Home_Team_Profile_Description: req.body.Home_Team_Profile_Description === null || req.body.Home_Team_Profile_Description === '' ? viewdata.Home_Team_Profile_Description : req.body.Home_Team_Profile_Description
            }

            let updatedata = await hometeamprofiledatamodel.updateOne({ _id: data._id }, {
                Home_Team_Profile_Name: data.Home_Team_Profile_Name,
                Home_Team_Profile_Designation: data.Home_Team_Profile_Designation,
                Home_Team_Profile_Description: data.Home_Team_Profile_Description
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
            let viewdata = await hometeamprofiledatamodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Team_Profile_Name: req.body.Home_Team_Profile_Name === null || req.body.Home_Team_Profile_Name === '' ? viewdata.Home_Team_Profile_Name : req.body.Home_Team_Profile_Name,
                Home_Team_Profile_Designation: req.body.Home_Team_Profile_Designation === null || req.body.Home_Team_Profile_Designation === '' ? viewdata.Home_Team_Profile_Designation : req.body.Home_Team_Profile_Designation,
                Home_Team_Profile_Description: req.body.Home_Team_Profile_Description === null || req.body.Home_Team_Profile_Description === '' ? viewdata.Home_Team_Profile_Description : req.body.Home_Team_Profile_Description,
                Home_Team_Profile_Picture: req.files[0].filename
            }


            let updatedata = await hometeamprofiledatamodel.updateOne({ _id: data._id }, {
                Home_Team_Profile_Name: req.body.Home_Team_Profile_Name === null || req.body.Home_Team_Profile_Name === '' ? viewdata.Home_Team_Profile_Name : req.body.Home_Team_Profile_Name,
                Home_Team_Profile_Designation: req.body.Home_Team_Profile_Designation === null || req.body.Home_Team_Profile_Designation === '' ? viewdata.Home_Team_Profile_Designation : req.body.Home_Team_Profile_Designation,
                Home_Team_Profile_Description: req.body.Home_Team_Profile_Description === null || req.body.Home_Team_Profile_Description === '' ? viewdata.Home_Team_Profile_Description : req.body.Home_Team_Profile_Description,
                Home_Team_Profile_Picture: data.Home_Team_Profile_Picture
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.Home_Team_Profile_Picture}`)
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



exports.deletehometeamprofiledata = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Home_Team_Profile_Name: req.body.Home_Team_Profile_Name,
            Home_Team_Profile_Designation: req.body.Home_Team_Profile_Designation,
            Home_Team_Profile_Description: req.body.Home_Team_Profile_Description,
            Home_Team_Profile_Picture: req.body.Home_Team_Profile_Picture,

        }
        let deletedata = await hometeamprofiledatamodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.Home_Team_Profile_Picture}`)
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










// add home donation 

exports.addhomedonationdata = async (req, res) => {
    try {
        let viewdata = await homedonationmodel.find()
        if (viewdata.length !== 0) {
            res.send({
                Status: 0,
                Message: "Data already exists"
            })
        }

        else {
            let data = {
                Home_Donation_Heading: req.body.Home_Donation_Heading,
                Home_Donation_Description: req.body.Home_Donation_Description,
            }

            let insertdata = await homedonationmodel(data)
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

    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}


exports.viewhomedonationdata = async (req, res) => {
    try {
        let viewdata = await homedonationmodel.findOne();
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




exports.updatedonationdata = async (req, res) => {
    try {

        let viewdata = await homedonationmodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Home_Donation_Heading: req.body.Home_Donation_Heading === null || req.body.Home_Donation_Heading === '' ? viewdata.Home_Donation_Heading : req.body.Home_Donation_Heading,
            Home_Donation_Description: req.body.Home_Donation_Description === null || req.body.Home_Donation_Description === '' ? viewdata.Home_Donation_Description : req.body.Home_Donation_Description
        }

        let updatedata = await homedonationmodel.updateOne({ _id: data._id }, {
            Home_Donation_Heading: data.Home_Donation_Heading,
            Home_Donation_Description: data.Home_Donation_Description
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