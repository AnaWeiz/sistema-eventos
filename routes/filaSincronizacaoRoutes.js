const express = require('express');
const router = express.Router();
const filaSincronizacaoController = require('../controllers/filaSincronizacaoController');

router.get('/', filaSincronizacaoController.listarFilas);
router.get('/:id', filaSincronizacaoController.buscarFila);
router.post('/', filaSincronizacaoController.criarFila);
router.patch('/:id', filaSincronizacaoController.atualizarFila);
router.delete('/:id', filaSincronizacaoController.excluirFila);

module.exports = router;