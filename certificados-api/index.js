require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();

const templateCertificadoRoutes = require('./routes/templateCertificadoRoutes');
const certificadoRoutes = require('./routes/certificadoRoutes');

app.use(express.json());

app.use('/template-certificados', templateCertificadoRoutes);
app.use('/certificados', certificadoRoutes);

const PORT = Number(process.env.CERTIFICADOS_PORT) || 3003;

console.log('Certificados API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});