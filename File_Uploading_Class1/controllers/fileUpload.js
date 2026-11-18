const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


// File Upload Controller
exports.localFileUpload = async (req, res) => {
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
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// Image Uploading handler
exports.imageUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
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


        res.json({
            success: true,
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