const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

router.get('/', presencaController.listarPresencas);
router.get('/:id', presencaController.buscarPresenca);
router.post('/', presencaController.criarPresenca);
router.patch('/:id', presencaController.atualizarPresenca);
router.delete('/:id', presencaController.excluirPresenca);

module.exports = router;