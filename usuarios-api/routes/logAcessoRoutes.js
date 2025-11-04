const express = require('express');
const router = express.Router();
const logAcessoController = require('../controllers/logAcessoController');

router.get('/', logAcessoController.listarLogs);
router.get('/:id', logAcessoController.buscarLog);
router.post('/', logAcessoController.criarLog);
router.put('/:id', logAcessoController.atualizarLog);
router.delete('/:id', logAcessoController.excluirLog);

module.exports = router;