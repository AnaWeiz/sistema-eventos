const express = require('express');
const router = express.Router();
const sessaoController = require('../controllers/sessaoController');

router.get('/', sessaoController.listarSessoes);
router.get('/:id', sessaoController.buscarSessao);
router.post('/', sessaoController.criarSessao);
router.patch('/:id', sessaoController.atualizarSessao);
router.delete('/:id', sessaoController.excluirSessao);

module.exports = router;