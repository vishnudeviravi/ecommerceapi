const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    let name = file.originalname.split(".")[0];
    let ext = file.mimetype.split("/")[1];
    console.log(`${name}.${ext}`);
    cb(null, `${name}.${ext}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    const imgUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.send({ url: imgUrl });
  } catch (err) {
    res.send({ err });
  }
});

module.exports = router;
