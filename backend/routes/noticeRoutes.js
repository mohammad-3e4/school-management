const express = require("express");
const router = express.Router();
const {getNotice,createNotice,getNoticeFlie, deleteNotice} = require("../controllers/noticeboardController");

router.post("/", createNotice); 
router.get('/',getNotice); 
router.delete('/:id',deleteNotice); 
router.get("/download/:filename", getNoticeFlie);

module.exports = router;
