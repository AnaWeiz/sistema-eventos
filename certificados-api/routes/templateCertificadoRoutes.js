const express = require('express');
const router = express.Router();
const templateCertificadoController = require('../controllers/templateCertificadoController');

router.get('/', templateCertificadoController.listarTemplates);
router.get('/:id', templateCertificadoController.buscarTemplate);
router.post('/', templateCertificadoController.criarTemplate);
router.put('/:id', templateCertificadoController.atualizarTemplate);
router.delete('/:id', templateCertificadoController.excluirTemplate);

module.exports = router;