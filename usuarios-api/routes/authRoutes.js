const express = require('express');
const auth = require('../controllers/authController');
const { verifyJWT } = require('../../middleware/authToken.js');

const router = express.Router();

router.post('/login', auth.login);
router.post('/logout', verifyJWT, auth.logout);

module.exports = router;