const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const cloudinaryController = require('../controllers/cloudinary');
const passport = require('passport');
const authentication = passport.authenticate("jwt", {session: false});
const upload = require('../middlewares/upload');
//GET
router.get('/me', authentication, userController.getMe);
router.get('/:id', authentication, userController.getUserById);

//PUT
router.put('/:id', authentication, userController.updateUser);

//POST
router.post('/register', authController.register);
router.post('/login', authController.login);

//PATCH
router.patch(
    '/profile_img',
    authentication, //req.user
    upload.single('profile_img'), //req.file
    cloudinaryController.updateProfileImg
  );

module.exports = router;