const express = require("express");
const router = express.Router();
const {getNotice,createNotice,getNoticeFlie} = require("../controllers/noticeboardController");


router.post("/", createNotice); 
router.get('/',getNotice); 
router.get("/download/:filename", getNoticeFlie);

module.exports = router;
