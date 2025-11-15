require('dotenv').config({ path: '../.env' });
const express = require('express');
const { verifyJWT } = require('../middleware/authToken.js');

const app = express();

const certificadoRoutes = require('./routes/certificadoRoutes');

app.use(express.json());
app.use(verifyJWT)
app.use('/certificados', certificadoRoutes);

const PORT = Number(process.env.CERTIFICADOS_PORT) || 3003;

console.log('Certificados API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});