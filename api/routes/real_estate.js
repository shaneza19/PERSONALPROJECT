const express = require('express');
const router = express.Router();
const real_estateControllers = require('../controllers/real_estate');

const passport = require('passport');
const authentication = passport.authenticate("jwt", {session: false});

//GET
router.get('/', real_estateControllers.getAllRealEstates);
router.get('/:id', real_estateControllers.getRealEstateById);

//POST
router.post('/create', authentication, real_estateControllers.createRealEstate);

//PUT
router.put('/:id', authentication, real_estateControllers.updateRealEstate);

//DELETE
router.delete('/:id', authentication, real_estateControllers.deleteRealEstate);

module.exports = router;