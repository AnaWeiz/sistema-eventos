const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const eventoRoutes = require('./eventoRoutes');
const templateCertificadoRoutes = require('./templateCertificadoRoutes');
const inscricaoRoutes = require('./inscricaoRoutes');
const presencaRoutes = require('./presencaRoutes');
const certificadoRoutes = require('./certificadoRoutes');
const sessaoRoutes = require('./sessaoRoutes');
const logAcessoRoutes = require('./logAcessoRoutes');
const filaSincronizacaoRoutes = require('./filaSincronizacaoRoutes');
const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/eventos', eventoRoutes);
router.use('/template-certificados', templateCertificadoRoutes);
router.use('/inscricoes', inscricaoRoutes);
router.use('/presencas', presencaRoutes);
router.use('/certificados', certificadoRoutes);
router.use('/sessoes', sessaoRoutes);
router.use('/logs-acesso', logAcessoRoutes);
router.use('/fila-sincronizacao', filaSincronizacaoRoutes);

module.exports = router;