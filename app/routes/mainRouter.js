const express = require('express');

const router = express.Router();


const userController = require('../controllers/userController');
const checkJwt = require('../../middlewares/checkJwt');

// AUTH
router.post('/signin', userController.signin);
router.post('/login', userController.login);
router.get('/signout', checkJwt, userController.signout)

router.get('/vote', checkJwt, userController.signout)

module.exports = router;
