const express = require('express');
const router = express.Router();
const { getIdcard } = require("../controllers/idcardController")




router.get("/card", getIdcard)




module.exports = router;
