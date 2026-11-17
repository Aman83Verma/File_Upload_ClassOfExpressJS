const File = require("../models/File");

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File is Available ", file);

        let path = __dirname + "/files/" + `${file.name.split(".")[0]}` + `.${file.name.split(".")[1]}`;
        console.log("Path is Available ", path);
        
        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: "Local File Uploaded Successfully."
        })

    } catch(error) {
        console.log("Not able to upload the file on Server.");
        console.log(error);
    }
}