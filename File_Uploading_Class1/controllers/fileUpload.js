const File = require("../models/File");

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