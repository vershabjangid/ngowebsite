const createprofilemodel = require("../model/CreateProfileModel")
const noticemodel = require("../model/NoticeModel")

exports.addnotice = async (req, res) => {
    try {
        let data = {
            Notice_Heading: req.body.Notice_Heading,
            Notice_Description: req.body.Notice_Description,
            Notice_Reason: req.body.Notice_Reason,
            Send_To: req.body.Send_To,
            Date: Date.now()
        }

        if (data.Send_To === "All") {
            let insertdata = await noticemodel(data);
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
        else {
            let viewdata = await createprofilemodel.findOne({ Sub_Id: data.Send_To })
            if (viewdata !== null) {
                let insertdata = await noticemodel(data);
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
            else {
                res.send({
                    Status: 0,
                    Message: "User not found"
                })
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



exports.viewadminnotice = async (req, res) => {
    try {
        let viewdata = await noticemodel.find().sort({ _id: -1 })
        res.send(viewdata)
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}



exports.updateadminnotice = async (req, res) => {
    try {
        let viewdata = await noticemodel.findOne({ _id: req.body._id })
        let data = {
            _id: req.body._id,
            Notice_Heading: req.body.Notice_Heading === null || req.body.Notice_Heading === '' ? viewdata.Notice_Heading : req.body.Notice_Heading,
            Notice_Description: req.body.Notice_Description === null || req.body.Notice_Description === '' ? viewdata.Notice_Description : req.body.Notice_Description,
            Notice_Reason: req.body.Notice_Reason === null || req.body.Notice_Reason === '' ? viewdata.Notice_Reason : req.body.Notice_Reason
        }

        let updatedata = await noticemodel.updateOne({ _id: data._id }, {
            Notice_Heading: data.Notice_Heading,
            Notice_Description: data.Notice_Description,
            Notice_Reason: data.Notice_Reason,

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







exports.deletenotice = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }
        let deletedata = await noticemodel.deleteOne({ _id: data._id })
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





exports.viewnotices = async (req, res) => {
    try {
        let viewdata = await noticemodel.find({
            $or: [
                { Send_To: req.session.user }, { Send_To: 'All' }
            ]
        }).sort({ _id: -1 })
        res.send(viewdata)
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}