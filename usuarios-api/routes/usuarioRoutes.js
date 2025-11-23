const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/porEmail/:email', usuarioController.buscarUsuarioPorEmail);
router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.buscarUsuario);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.excluirUsuario);

module.exports = router;