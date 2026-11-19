// App Creation
const express = require("express");
const app = express();


const os = require("os");
const path = require("path");
const fs = require("fs");

// Finding PORT Number
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Adding the Middleware
app.use(express.json());

const fileUpload = require("express-fileupload");
const tempDir = path.join(os.tmpdir(), "express-fileupload");

fs.mkdirSync(tempDir, { recursive: true });
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Connection if DataBase
const database = require("./config/database");
database.dbConnect();

// Connecting Cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Mounting API Routes
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

// Activating Server
app.listen(PORT, () => {
    console.log(`App is running Successfully at Port Number : ${PORT}`);
})
