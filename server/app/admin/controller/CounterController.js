const fs = require('fs')
let path = require('path')
const countermodel = require("../model/CounterModel")
let finalpath = path.join(__dirname, '../../../uploads')
let imageurl = "http://localhost:5500/uploads/"


exports.addcounters = async (req, res) => {
    try {
        if (req.files[0] !== undefined) {
            if (req.files[0].filename.includes('.fake')) {
                fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            }
            else {
                let viewdata = await countermodel.find();
                if (viewdata.length < 3) {
                    let data = {
                        Home_Counter_Heading: req.body.Home_Counter_Heading,
                        Counter_Value: req.body.Counter_Value,
                        CounterIcon: req.files[0].filename
                    }

                    let insertdata = await countermodel(data)
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
                    res.send({
                        Status: 0,
                        Message: "Maximum limit is 3"
                    })
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
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


exports.viewcounters = async (req, res) => {
    try {
        let viewdata = await countermodel.find();
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

exports.deletecounters = async (req, res) => {
    try {
        let data = {
            _id: req.body._id,
            Home_Counter_Heading: req.body.Home_Counter_Heading,
            Counter_Value: req.body.Counter_Value,
            CounterIcon: req.body.CounterIcon
        }
        let deletedata = await countermodel.deleteOne({ _id: data._id })
        if (deletedata.deletedCount >= 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
            fs.unlinkSync(`${finalpath}/${req.body.CounterIcon}`)
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


exports.updatecounters = async (req, res) => {
    try {
        if (req.files[0] === undefined) {
            let viewdata = await countermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Counter_Heading: req.body.Home_Counter_Heading === null || req.body.Home_Counter_Heading === '' ? viewdata.Home_Counter_Heading : req.body.Home_Counter_Heading,
                Counter_Value: req.body.Counter_Value === null || req.body.Counter_Value === '' ? viewdata.Counter_Value : req.body.Counter_Value
            }

            let updatedata = await countermodel.updateOne({ _id: data._id }, {
                Home_Counter_Heading: data.Home_Counter_Heading,
                Counter_Value: data.Counter_Value
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
            let viewdata = await countermodel.findOne({ _id: req.body._id })
            let data = {
                _id: req.body._id,
                Home_Counter_Heading: req.body.Home_Counter_Heading === null || req.body.Home_Counter_Heading === '' ? viewdata.Home_Counter_Heading : req.body.Home_Counter_Heading,
                Counter_Value: req.body.Counter_Value === null || req.body.Counter_Value === '' ? viewdata.Counter_Value : req.body.Counter_Value,
                CounterIcon: req.files[0].filename
            }


            let updatedata = await countermodel.updateOne({ _id: data._id }, {
                Home_Counter_Heading: data.Home_Counter_Heading,
                Counter_Value: data.Counter_Value,
                CounterIcon: data.CounterIcon
            })

            if (updatedata.modifiedCount >= 1) {
                fs.unlinkSync(`${finalpath}/${viewdata.CounterIcon}`)
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




