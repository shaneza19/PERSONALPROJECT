const express = require('express');
const router = express.Router();
const real_estateControllers = require('../controllers/real_estate');
const cloudinaryController = require('../controllers/cloudinary');
const passport = require('passport');
const authentication = passport.authenticate("jwt", {session: false});
const upload = require('../middlewares/upload');

//GET
router.get('/', real_estateControllers.getAllRealEstates);
router.get('/new', real_estateControllers.getNewRealEstates);
router.get('/loadMore', real_estateControllers.loadMoreRealEstates);
router.get('/:id', real_estateControllers.getRealEstateById);

//POST
router.post('/create',authentication, //req.user
upload.single('image_1'), //upload.array('images', 5 ), //req.file
real_estateControllers.createRealEstate);

//PUT
router.put('/:id', authentication, real_estateControllers.updateRealEstate);

//PATCH
router.patch(
    '/:id',
    authentication, //req.user
    upload.single('image_1'), //req.file
    cloudinaryController.updateRealEstateImg1
  );

//DELETE
router.delete('/:id', authentication, real_estateControllers.deleteRealEstate);

module.exports = router;