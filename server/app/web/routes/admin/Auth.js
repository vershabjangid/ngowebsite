let express = require('express')
const { adminlogin, checkadminsession, adminlogout, webadminlogin, checkwebadminsession, webadminlogout } = require('../../../admin/controller/AuthController')
let adminroutes = express.Router()
let multer = require('multer')
let path = require('path')
const { addhomebanner, viewhomebanner, deletehomebanner, updatehomebannerslides, addhomeaboutdata, viewhomeaboutdata, updateaboutdata, addhomegoalsdata, viewhomegoalsdata, updategoalsdata, addhomemanagementdata, viewhomemanagementdata, updatemanagementdata, addhomemanagementprofiledata, viewhomemanagementprofiledata, updatehomemanagementprofiledata, deletehomemanagementprofiledata, addhomegallerydata, viewhomegallerydata, updategallerydata, addhometeammemberdata, viewhometeammemberdata, updateteammemberdata, addhometeamprofiledata, viewhometeamprofiledata, updatehometeamprofiledata, deletehometeamprofiledata, addhomedonationdata, updatedonationdata, viewhomedonationdata } = require('../../../admin/controller/HomeController')
let jwt = require('jsonwebtoken')
let dotenv = require('dotenv')
const { addhomegoalscard, viewgoalscarddata, deletehomegoalscard, updatehomegoalscard, addgoalsparagraphheading, viewgoalsparagraphheading, addgoalscardparagraph, viewgoalscardparagraph, deletegoalscardparagraph, deletegoalsparagraphheading, updategoalsparagraphheading, updategoalscardparagraph } = require('../../../admin/controller/GoalsController')
const { addhomegallery, viewhomegallery, deletehomegallery, updatehomegallery, addgallerybannercontroller, viewgallerybannercontroller, updategallerybannercontroller } = require('../../../admin/controller/GalleryController')
const { addaboutscontroller, addaboutbannercontroller, viewaboutbannercontroller, updateaboutbannercontroller, addaboutparagraphsection, viewaboutparagraphsection, updateaboutparagraphsection, deleteaboutparagraphsection, addaboutextraparagraphcontroller, viewaboutextraparagraphcontroller, updateaboutextraparagraphcontroller, deleteaboutextraparagraphcontroller } = require('../../../admin/controller/AboutController')
const { addnewsbannercontroller, viewnewsbannercontroller, updatenewsbannercontroller, addnewscontroller, viewnewscontroller, updatenewscontroller, deletenewscontroller } = require('../../../admin/controller/NewsController')
const { addcontactbannercontroller, viewcontactbannercontroller, updatecontactbannercontroller, AddQueriescontroller, ViewQueriescontroller, deletequeries } = require('../../../admin/controller/ContactController')
const { addtermsbannercontroller, updatetermsbannercontroller, viewtermsbannercontroller, addtermsparagraphsection, viewtermsparagraphsection, updatetermsparagraphsection, deletetermsparagraphsection, addtermsextraparagraphcontroller, viewtermsextraparagraphcontroller, updatetermsextraparagraphcontroller, deletetermsextraparagraphcontroller } = require('../../../admin/controller/TermsController')
const { addprivacybannercontroller, viewprivacybannercontroller, updateprivacybannercontroller, addprivacyparagraphsection, viewprivacyparagraphsection, updateprivacyparagraphsection, deleteprivacyparagraphsection, addprivacyextraparagraphcontroller, viewprivacyextraparagraphcontroller, updateprivacyextraparagraphcontroller, deleteprivacyextraparagraphcontroller } = require('../../../admin/controller/PrivacyController')
const { viewallusers } = require('../../controller/AuthController')
const { addnotice, updateadminnotice, viewadminnotice, deletenotice } = require('../../controller/noticecontroller')
const { addcertificates, viewadmincertificate, deletecertificate, updatecertificate } = require('../../controller/certificatecontroller')
const { viewadminmembershiptransactions } = require('../../controller/MembershipController')
const { viewadmindonationstransactions } = require('../../controller/donationcontroller')
dotenv.config({ debug: false, quiet: true });

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'application/pdf') {
            const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extension = path.extname(file.originalname);
            const filename = 'file' + uniquesuffix + extension;
            cb(null, filename)
        }
        else {
            const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const filename = 'file' + uniquesuffix + ".fake";
            cb(null, filename)
        }
    }
})


const upload = multer({ storage: storage }).any(['Home_Banner_Image', 'Home_About_Image', 'Home_Management_Profile_Picture', 'Home_Team_Profile_Picture', 'Home_Goals_Card_Icon', 'About_Image', 'About_Banner_Image', 'Gallery_Banner_Image', 'News_Banner_Image', 'Contact_Banner_Image', 'Terms_Image', 'Privacy_Image', 'Certificate_File'])


let verifytoken = (req, res, next) => {
    let header = req.headers['authorization']

    if (!header) {
        res.send({
            Status: 0,
            Message: "Token is required"
        })
    }
    else {
        console.log(process.env.ADMINJWTTOKEN)
        jwt.verify(header, process.env.ADMINJWTTOKEN, (err, user) => {
            if (err) {
                res.send({
                    Status: 0,
                    Message: "Invalid Token"
                })
            }
            else {
                next();
            }
        })
    }
}


let adminsession = (req, res, next) => {
    if (!req.session.user) {
        return res.send({
            Status: 0,
            Message: "Unauthorized User"
        });
    }
    next();
};


let webadminsession = (req, res, next) => {
    if (!req.session.admin) {
        return res.send({
            Status: 0,
            Message: "Unauthorized User"
        });
    }
    next();
};

adminroutes.post('/admin-login', adminlogin)
adminroutes.post('/check-admin-session', checkadminsession)
adminroutes.post('/admin-logout', verifytoken, adminsession, upload, adminlogout)


adminroutes.post('/add-home-banner', verifytoken, adminsession, upload, addhomebanner)
adminroutes.get('/view-home-banner', viewhomebanner)
adminroutes.delete('/delete-home-banner', verifytoken, adminsession, upload, deletehomebanner)
adminroutes.put('/update-home-banner', verifytoken, adminsession, upload, updatehomebannerslides)

// home about 
adminroutes.post('/add-home-about-banner', verifytoken, adminsession, upload, addhomeaboutdata)
adminroutes.get('/view-home-about-banner', viewhomeaboutdata)
adminroutes.put('/update-home-about-banner', verifytoken, adminsession, upload, updateaboutdata)

//home goals 
adminroutes.post('/add-home-goals', verifytoken, adminsession, upload, addhomegoalsdata)
adminroutes.get('/view-home-goals', viewhomegoalsdata)
adminroutes.put('/update-home-goals', verifytoken, adminsession, upload, updategoalsdata)

//home management 
adminroutes.post('/add-home-management-body', verifytoken, adminsession, upload, addhomemanagementdata)
adminroutes.get('/view-home-management-body', viewhomemanagementdata)
adminroutes.put('/update-home-management-body', verifytoken, adminsession, upload, updatemanagementdata)

// home mangement card 
adminroutes.post('/add-home-management-card', verifytoken, adminsession, upload, addhomemanagementprofiledata)
adminroutes.get('/view-home-management-card', viewhomemanagementprofiledata)
adminroutes.put('/update-home-management-card', verifytoken, adminsession, upload, updatehomemanagementprofiledata)
adminroutes.delete('/delete-home-management-card', verifytoken, adminsession, upload, deletehomemanagementprofiledata)


//home gallery 
adminroutes.post('/add-home-gallery', verifytoken, adminsession, upload, addhomegallerydata)
adminroutes.get('/view-home-gallery', viewhomegallerydata)
adminroutes.put('/update-home-gallery', verifytoken, adminsession, upload, updategallerydata)


//home team 
adminroutes.post('/add-home-team', verifytoken, adminsession, upload, addhometeammemberdata)
adminroutes.get('/view-home-team', viewhometeammemberdata)
adminroutes.put('/update-home-team', verifytoken, adminsession, upload, updateteammemberdata)


// home team card 
adminroutes.post('/add-home-team-card', verifytoken, adminsession, upload, addhometeamprofiledata)
adminroutes.get('/view-home-team-card', viewhometeamprofiledata)
adminroutes.put('/update-home-team-card', verifytoken, adminsession, upload, updatehometeamprofiledata)
adminroutes.delete('/delete-home-team-card', verifytoken, adminsession, upload, deletehometeamprofiledata)


//home team 
adminroutes.post('/add-home-donation', verifytoken, adminsession, upload, addhomedonationdata)
adminroutes.get('/view-home-donation', viewhomedonationdata)
adminroutes.put('/update-home-donation', verifytoken, adminsession, upload, updatedonationdata)




// goals card routes 
adminroutes.post('/add-goals-card', verifytoken, adminsession, upload, addhomegoalscard)
adminroutes.get('/view-goals-card', viewgoalscarddata)
adminroutes.delete('/delete-goals-card', verifytoken, adminsession, upload, deletehomegoalscard)
adminroutes.put('/update-goals-card', verifytoken, adminsession, upload, updatehomegoalscard)


adminroutes.post('/add-goals-paragraph-heading', verifytoken, adminsession, upload, addgoalsparagraphheading)
adminroutes.get('/view-goals-paragraph-heading', viewgoalsparagraphheading)
adminroutes.delete('/delete-goals-paragraph-heading', verifytoken, adminsession, upload, deletegoalsparagraphheading)
adminroutes.put('/update-goals-paragraph-heading', verifytoken, adminsession, upload, updategoalsparagraphheading)



adminroutes.post('/add-goals-card-paragraph', verifytoken, adminsession, upload, addgoalscardparagraph)
adminroutes.get('/view-goals-card-paragraph', viewgoalscardparagraph)
adminroutes.delete('/delete-goals-card-paragraph', verifytoken, adminsession, upload, deletegoalscardparagraph)
adminroutes.put('/update-goals-card-paragraph', verifytoken, adminsession, upload, updategoalscardparagraph)

// gallery routes 
adminroutes.post('/add-gallery', verifytoken, adminsession, upload, addhomegallery)
adminroutes.get('/view-gallery', viewhomegallery)
adminroutes.delete('/delete-gallery', verifytoken, adminsession, upload, deletehomegallery)
adminroutes.put('/update-gallery', verifytoken, adminsession, upload, updatehomegallery)

adminroutes.post('/add-gallery-banner-section', verifytoken, adminsession, upload, addgallerybannercontroller)
adminroutes.get('/view-gallery-banner-section', viewgallerybannercontroller)
adminroutes.put('/update-gallery-banner-section', verifytoken, adminsession, upload, updategallerybannercontroller)






adminroutes.post('/add-about-banner-section', verifytoken, adminsession, upload, addaboutbannercontroller)
adminroutes.get('/view-about-banner-section', viewaboutbannercontroller)
adminroutes.put('/update-about-banner-section', verifytoken, adminsession, upload, updateaboutbannercontroller)

adminroutes.post('/add-about-paragraph-section', verifytoken, adminsession, upload, addaboutparagraphsection)
adminroutes.get('/view-about-paragraph-section', viewaboutparagraphsection)
adminroutes.put('/update-about-paragraph-section', verifytoken, adminsession, upload, updateaboutparagraphsection)
adminroutes.delete('/delete-about-paragraph-section', verifytoken, adminsession, upload, deleteaboutparagraphsection)

adminroutes.post('/add-about-extra-paragraph', verifytoken, adminsession, upload, addaboutextraparagraphcontroller)
adminroutes.get('/view-about-extra-paragraph', viewaboutextraparagraphcontroller)
adminroutes.put('/update-about-extra-paragraph', verifytoken, adminsession, upload, updateaboutextraparagraphcontroller)
adminroutes.delete('/delete-about-extra-paragraph', verifytoken, adminsession, upload, deleteaboutextraparagraphcontroller)

// news routes 
adminroutes.post('/add-news-banner-section', verifytoken, adminsession, upload, addnewsbannercontroller)
adminroutes.get('/view-news-banner-section', viewnewsbannercontroller)
adminroutes.put('/update-news-banner-section', verifytoken, adminsession, upload, updatenewsbannercontroller)


adminroutes.post('/add-news', verifytoken, adminsession, upload, addnewscontroller)
adminroutes.get('/view-news', viewnewscontroller)
adminroutes.put('/update-news', verifytoken, adminsession, upload, updatenewscontroller)
adminroutes.delete('/delete-news', verifytoken, adminsession, upload, deletenewscontroller)

adminroutes.post('/add-contact-banner', verifytoken, adminsession, upload, addcontactbannercontroller)
adminroutes.get('/view-contact-banner', viewcontactbannercontroller)
adminroutes.put('/update-contact-banner', verifytoken, adminsession, upload, updatecontactbannercontroller)

// terms & conditions 
adminroutes.post('/add-terms-banner-section', verifytoken, adminsession, upload, addtermsbannercontroller)
adminroutes.get('/view-terms-banner-section', viewtermsbannercontroller)
adminroutes.put('/update-terms-banner-section', verifytoken, adminsession, upload, updatetermsbannercontroller)



adminroutes.post('/add-terms-paragraph-section', verifytoken, adminsession, upload, addtermsparagraphsection)
adminroutes.get('/view-terms-paragraph-section', viewtermsparagraphsection)
adminroutes.put('/update-terms-paragraph-section', verifytoken, adminsession, upload, updatetermsparagraphsection)
adminroutes.delete('/delete-terms-paragraph-section', verifytoken, adminsession, upload, deletetermsparagraphsection)



adminroutes.post('/add-terms-extra-paragraph', verifytoken, adminsession, upload, addtermsextraparagraphcontroller)
adminroutes.get('/view-terms-extra-paragraph', viewtermsextraparagraphcontroller)
adminroutes.put('/update-terms-extra-paragraph', verifytoken, adminsession, upload, updatetermsextraparagraphcontroller)
adminroutes.delete('/delete-terms-extra-paragraph', verifytoken, adminsession, upload, deletetermsextraparagraphcontroller)



// privacy policy 

adminroutes.post('/add-privacy-banner-section', verifytoken, adminsession, upload, addprivacybannercontroller)
adminroutes.get('/view-privacy-banner-section', viewprivacybannercontroller)
adminroutes.put('/update-privacy-banner-section', verifytoken, adminsession, upload, updateprivacybannercontroller)



adminroutes.post('/add-privacy-paragraph-section', verifytoken, adminsession, upload, addprivacyparagraphsection)
adminroutes.get('/view-privacy-paragraph-section', viewprivacyparagraphsection)
adminroutes.put('/update-privacy-paragraph-section', verifytoken, adminsession, upload, updateprivacyparagraphsection)
adminroutes.delete('/delete-privacy-paragraph-section', verifytoken, adminsession, upload, deleteprivacyparagraphsection)



adminroutes.post('/add-privacy-extra-paragraph', verifytoken, adminsession, upload, addprivacyextraparagraphcontroller)
adminroutes.get('/view-privacy-extra-paragraph', viewprivacyextraparagraphcontroller)
adminroutes.put('/update-privacy-extra-paragraph', verifytoken, adminsession, upload, updateprivacyextraparagraphcontroller)
adminroutes.delete('/delete-privacy-extra-paragraph', verifytoken, adminsession, upload, deleteprivacyextraparagraphcontroller)

// website admin  panel routes 
adminroutes.post('/web-admin-login', webadminlogin)
adminroutes.post('/check-web-admin-session', checkwebadminsession)
adminroutes.post('/web-admin-logout', verifytoken, webadminsession, upload, webadminlogout)

adminroutes.post('/send-query', upload, AddQueriescontroller)
adminroutes.get('/view-query', verifytoken, webadminsession, upload, ViewQueriescontroller)
adminroutes.delete('/delete-query', verifytoken, webadminsession, upload, deletequeries)

adminroutes.get('/view-users', verifytoken, webadminsession, upload, viewallusers)

adminroutes.post('/add-notice', verifytoken, webadminsession, upload, addnotice)
adminroutes.get('/view-notice', verifytoken, webadminsession, upload, viewadminnotice)
adminroutes.put('/update-notice', verifytoken, webadminsession, upload, updateadminnotice)
adminroutes.delete('/delete-notice', verifytoken, webadminsession, upload, deletenotice)

adminroutes.post('/add-certificates', verifytoken, webadminsession, upload, addcertificates)
adminroutes.get('/view-certificates', verifytoken, webadminsession, upload, viewadmincertificate)
adminroutes.put('/update-certificates', verifytoken, webadminsession, upload, updatecertificate)
adminroutes.delete('/delete-certificate', verifytoken, webadminsession, upload, deletecertificate)

adminroutes.get('/view-all-membership-transactions', verifytoken, webadminsession, upload, viewadminmembershiptransactions)
adminroutes.get('/view-all-donations', verifytoken, webadminsession, upload, viewadmindonationstransactions)

module.exports = adminroutes