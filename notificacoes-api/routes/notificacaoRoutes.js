const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');

router.post('/email', notificacaoController.enviarEmail);

module.exports = router;