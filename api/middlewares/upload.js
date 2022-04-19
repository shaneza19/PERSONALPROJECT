const multer = require("multer");

//store file in folder public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  // file name = time in millisecond
  // file type = string    '' + ....
  // mimetype
  filename: (req, file, cb) => {
    cb(null, "" + new Date().getTime() + "." + file.mimetype.split("/")[1]);
  },
  fileFilter: (req, file, cb) => {
    if (req.body.file !== "null" || req.body.file !== "undefined") {
      const extname = path.extname(file.originalname).toLowerCase();
      if (
        extname !== ".jpg" &&
        extname !== ".jpeg" &&
        extname !== ".png" 
      ) {
        cb(new Error("File type is not supported"), false);
        return;
      }
    }
    cb(null, true);
  },
  limits:{
    fileSize: 1000000 * 30
    //roughly 30mb
  }
});

module.exports = multer({ storage });
