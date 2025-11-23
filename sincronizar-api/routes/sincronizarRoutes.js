const express = require('express');
const sincronizarController = require('../controller/sincronizar.js');
// const { verifyJWT } = require('../../middleware/authToken.js');

const router = express.Router();

router.post('/', sincronizarController.sincronizar);

module.exports = router;