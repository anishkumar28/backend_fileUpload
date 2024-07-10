// create app
const express = require("express");
const app = express();

// find port 
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Database connection
const db = require("./config/database");
db.connect();

// Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


// import route
const Upload = require("./routes/FileUpload");

// mount route
app.use("/api/v1/upload",Upload);

// activate server
app.listen(PORT, () => {
    console.log(`Server started suceessfully at ${PORT}`);
})