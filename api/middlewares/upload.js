const multer = require('multer');

//store file in folder public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  // file name = time in millisecond
  // file type = string    '' + ....
  // mimetype  
  filename: (req, file, cb) => {
    cb(null, '' + new Date().getTime() + '.' + file.mimetype.split('/')[1]);
  }
});

module.exports = multer({ storage });
