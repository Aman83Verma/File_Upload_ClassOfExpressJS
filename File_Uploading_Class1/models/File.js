const mongoose = require("mongoose");

const fileUpload = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    },
    videoURL: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("File", fileUpload);