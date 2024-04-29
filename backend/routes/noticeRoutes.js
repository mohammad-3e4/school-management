const express = require("express");
const router = express.Router();
const {getNotice,createNotice,getNoticeFlie} = require("../controllers/noticeboardController");
const { upload} = require("../middlewares/NoticeMiddleware");


router.post("/create", upload.single('file'), createNotice); 
router.get("/", getNotice);
router.get("/download/:filename", getNoticeFlie);

module.exports = router;
