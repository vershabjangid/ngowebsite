let dotenv = require('dotenv')
dotenv.config({ debug: false, quiet: true });
let jwt = require('jsonwebtoken')
let AdminEmail = process.env.ADMINEMAIL
let AdminPassword = process.env.ADMINPASSWORD
let adminjwttoken = process.env.ADMINJWTTOKEN
let WebAdminEmail = process.env.WEBADMINEMAIL
let WebAdminPassword = process.env.WEBADMINPASSWORD


let generateadmintoken = () => {
    try {
        let newtoken;
        return jwt.sign({ newtoken }, adminjwttoken, { expiresIn: "2h" })
    }
    catch (error) {
        return ({
            Status: 0,
            Message: "Something went wrong"
        })
    }
}


exports.adminlogin = (req, res) => {
    try {
        if (req.body === undefined) {
            res.send({
                Status: 0,
                Message: "Data Missing"
            })
        }
        else {
            let data = {
                Email: req.body.Email,
                Password: req.body.Password
            }


            if (data.Email === AdminEmail && data.Password === AdminPassword) {
                req.session.user = req.body.Email,
                    res.send({
                        Status: 1,
                        Message: "Login Successfully",
                        Token: generateadmintoken()
                    })
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Invalid email or password"
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







exports.adminlogout = (req, res) => {
    try {
        let token = req.headers['authorization']
        let decode = jwt.decode(token)
        if (decode.exp !== undefined || decode.exp !== null) {
            decode.exp = 0
            req.session.user = undefined
            res.send({
                Status: 1,
                Message: "Logout Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Unable to Logout"
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



exports.checkadminsession = (req, res) => {
    try {
        if (req.session.user !== undefined) {
            res.send({
                Status: 1,
                Message: "Session Active"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Session Expired"
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




// web admin login 



exports.webadminlogin = (req, res) => {
    try {
        if (req.body === undefined) {
            res.send({
                Status: 0,
                Message: "Data Missing"
            })
        }
        else {
            let data = {
                Email: req.body.Email,
                Password: req.body.Password
            }


            if (data.Email === WebAdminEmail && data.Password === WebAdminPassword) {
                req.session.admin = req.body.Email,
                    res.send({
                        Status: 1,
                        Message: "Login Successfully",
                        Token: generateadmintoken()
                    })
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Invalid email or password"
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




exports.checkwebadminsession = (req, res) => {
    try {
        if (req.session.admin !== undefined) {
            res.send({
                Status: 1,
                Message: "Session Active"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Session Expired"
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




exports.webadminlogout = (req, res) => {
    try {
        let token = req.headers['authorization']
        let decode = jwt.decode(token)
        if (decode.exp !== undefined || decode.exp !== null) {
            decode.exp = 0
            req.session.admin = undefined
            res.send({
                Status: 1,
                Message: "Logout Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Unable to Logout"
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
