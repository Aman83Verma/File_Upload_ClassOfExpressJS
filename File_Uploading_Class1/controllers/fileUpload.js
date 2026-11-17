const File = require("../models/File");

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File is Available ", file);

        let path = __dirname + "/files/" + Date.now();
        console.log("Path is Available ", path);
        
        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: "Local File Uploaded Successfully."
        })

    } catch(error) {
        console.log(error);
    }
}