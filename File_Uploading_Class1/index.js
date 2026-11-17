// App Creation
const express = require("express");
const app = express();

// Finding PORT Number
require("dotenv").config();
PORT = process.env.PORT || 4000;

// Adding the Middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Connection if DataBase
const database = require("./config/databse");
database.dbConnect();

// Connecting Cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Mounting API Routes
const Upload = require("./routes/FileUpload");
app.use("app/v1/upload", Upload);

// Activating Server
app.listen(PORT, () => {
    console.log(`App is running Successfully at Port Number : ${PORT}`);
})
