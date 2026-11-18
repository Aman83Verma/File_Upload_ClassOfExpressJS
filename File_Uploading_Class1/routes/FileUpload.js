const express = require("express");
const router = express.Router();

const {localFileUploader, imageUploader, videoUploader, imageSizeReducer} = require("../controllers/fileUpload");

router.post("/localFileUpload", localFileUploader);
router.post("/imageUpload", imageUploader);
router.post("/videoUpload", videoUploader);
router.post("/imageSizeReduce", imageSizeReducer);

module.exports = router;