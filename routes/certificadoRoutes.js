const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');

router.get('/', certificadoController.listarCertificados);
router.get('/:id', certificadoController.buscarCertificado);
router.post('/', certificadoController.criarCertificado);
router.patch('/:id', certificadoController.atualizarCertificado);
router.delete('/:id', certificadoController.excluirCertificado);

module.exports = router;