const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


// File Upload Controller Handler
exports.localFileUploader = async (req, res) => {
    try {
        // Ftech File from Request..
        const file = req.files.file;
        console.log("File is Available ", file);

        // Create Path where File needed to be stored on Server..
        let path = __dirname + "/files/" + `${file.name.split(".")[0]}` + `.${file.name.split(".")[1]}`;
        console.log("Path is Available ", path);
        
        // Add Path to the Moving Function..
        file.mv(path, (err) => {
            console.log(err);
        })

        // Create a Successful Response..
        res.json({
            success: true,
            message: "Local File Uploaded Successfully."
        })

    } catch(error) {
        console.log("Not able to upload the file on Server.");
        console.log(error);
    }
}


// Function for File type check.
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}


// 
async function uploadFileToCloudinary(file, folder){
    const options = {folder};

    console.log("Checking Temp File: ", file.tempFilePath);
    
    // This will help to detect the file type automatically.
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// Image Uploading Handler
exports.imageUploader = async (req, res) => {
    try{
        // Fetching the data..
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
        const fileType = file.name.split(".")[1].toLowerCase();

        // If File type is not Supported then..
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File Type is not Supported.",
            })
        }

        // If File type is Supported then..
        const response = await uploadFileToCloudinary(file, "fileUploadClass"); // -> fileUploadClass folder is taken from Cloudinary website..
        console.log(response);
        

        // Saving the Datas Entry into Databse
        const fileData = await File.create({
            name, tags, email, imageURL: response.secure_url
        })

        res.json({
            success: true,
            imageURL: response.secure_url,
            message: "Image uploaded Successfully."
        })

        
    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong."
        })

    }
}


// Video Uploading Handler
exports.videoUploader = async (req, res) => {
    try{
        // Fetching the data..
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov", "mkv", "webm", "wmv"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File Type : ", fileType);
        

        // If File type is not Supported then..
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File Type is not Supported.",
            })
        }

        // If File type is Supported then..
        const response = await uploadFileToCloudinary(file, "fileUploadClass"); // -> fileUploadClass folder is taken from Cloudinary website..
        console.log(response);
        

        // Saving the Datas Entry into Databse
        const fileData = await File.create({
            name, tags, email, videoURL: response.secure_url
        })

        res.json({
            success: true,
            imageURL: response.secure_url,
            message: "Video uploaded Successfully."
        })


    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong."
        })
    }
}


// Image Size Reducing Handler
exports.imageSizeReducer = async (req, res) => {
    try{

    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong."
        })
    }
}