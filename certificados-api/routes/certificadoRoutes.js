const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');
const path = require('path');
const fs = require('fs');

router.get('/', certificadoController.listarCertificados);
router.get('/:id', certificadoController.buscarCertificado);
router.post('/verCertificado', certificadoController.buscarCertificadoPorHash);
router.post('/', certificadoController.criarCertificado);
router.put('/:id', certificadoController.atualizarCertificado);
router.delete('/:id', certificadoController.excluirCertificado);
router.get('/:id/pdf', (req, res) => {
  const filePath = path.join(__dirname, '../pdfs', `certificado_${req.params.id}.pdf`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ erro: 'Arquivo PDF não encontrado.' });
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificado.pdf');
  fs.createReadStream(filePath).pipe(res);
});

module.exports = router;