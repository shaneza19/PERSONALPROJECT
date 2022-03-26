const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user');

const passport = require('passport');
const authentication = passport.authenticate("jwt", {session: false});

//GET
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUserById);


//POST
router.post('/register', userControllers.createUser);
router.post('/login', userControllers.loginUser);

//PUT
router.put('/:id', authentication, userControllers.updateUser);

//DELETE
router.delete('/:id', userControllers.deleteUser);

module.exports = router;