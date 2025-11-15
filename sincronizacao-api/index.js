require('dotenv').config({ path: '../.env' });
const express = require('express');
const { verifyJWT } = require('../middleware/authToken.js');
const app = express();

const filaSincronizacaoRoutes = require('./routes/filaSincronizacaoRoutes');

app.use(express.json());
app.use(verifyJWT)
app.use('/sincronizacao', filaSincronizacaoRoutes);

const PORT = Number(process.env.SINCRONIZACAO_PORT) || 3005;
console.log('Sincronização API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});