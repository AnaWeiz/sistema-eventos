const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.listarEventos);
router.get('/:id', eventoController.buscarEvento);
router.post('/', eventoController.criarEvento);
router.patch('/:id', eventoController.atualizarEvento);
router.delete('/:id', eventoController.excluirEvento);

module.exports = router;