let express = require('express')
let app = express();
let mongoose = require('mongoose')
let cors = require('cors')
let cookieParser = require('cookie-parser');
const adminroutes = require('./app/web/routes/admin/Auth');
let expresssession = require('express-session')
const http = require('http');
const { Server } = require('socket.io');
const websiteroutes = require('./app/web/routes/web/Auth');

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


const server = http.createServer(app)

let websitesession = expresssession({
    name: "websitesession",
    secret: process.env.WEBSESSIONTOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // Prevent JS access
        secure: false,   // Set to `true` in production (HTTPS)
        sameSite: 'lax', // Ensures cookies are sent correctly
        maxAge: 2 * 60 * 60 * 1000  // 60 minute
    }
})



let adminsession = expresssession({
    name: "adminsession",
    secret: process.env.ADMINSESSIONTOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // Prevent JS access
        secure: false,   // Set to `true` in production (HTTPS)
        sameSite: 'lax', // Ensures cookies are sent correctly
        maxAge: 2 * 60 * 60 * 1000  // 60 minute
    }
})


app.use('/admin', adminsession, adminroutes)
app.use('/user', websitesession, websiteroutes)


// websocket connection 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


io.on("connection", (socket) => {
    console.log("websocket Connected", socket.id)

    socket.on("message", (data) => {
        console.log("websocket message", data)
        io.emit("message", data)
    })

    socket.on("disconnect", () => {
        console.log("❌ WebSocket disconnected:", socket.id);
    });
})


mongoose.connect('mongodb://localhost:27017/rcmicci')
    .then(() => {
        server.listen('5500', () => {
            console.log("Server listening at 5500")
        })
    })
    .catch((error) => {
        console.log("Connect Disconnected")
    })