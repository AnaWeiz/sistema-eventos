const express = require('express');
const router = express.Router();
const inscricaoController = require('../controllers/inscricaoController');

// Rotas principais de inscrições
router.get('/', inscricaoController.listarInscricoes);
router.get('/:id', inscricaoController.buscarInscricao);
router.post('/', inscricaoController.criarInscricao);
router.put('/:id', inscricaoController.atualizarInscricao);
router.delete('/:id', inscricaoController.excluirInscricao);

module.exports = router;