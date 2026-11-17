const mongoose = require("mongoose");

const fileUpload = new mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    imageURl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("File", fileUpload);