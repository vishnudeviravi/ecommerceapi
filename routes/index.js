const express = require("express");

const router = express.Router();

const productRoute = require("./productRoute");
const fileUpload = require("./fileUploadRoute");
const userRoute = require("./userRoute");
const categoryRoute = require("./categoryRoute");

router.use(productRoute);
router.use(fileUpload);
router.use(userRoute);
router.use(categoryRoute);

module.exports = router;
