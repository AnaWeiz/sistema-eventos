require('dotenv').config({ path: '../.env' });
const express = require('express');
const { verifyJWT } = require('../middleware/authToken.js');
const app = express();

//Importar rotas
const sincronizarRoutes = require('./routes/sincronizarRoutes.js');

//Middleware para tratar JSON
app.use(express.json());

//Rotas principais
app.use(verifyJWT)
app.use('/sincronizar', sincronizarRoutes);

//Porta configurada no .env
const PORT = Number(process.env.SINCRONIZAR_PORT) || 3005;

//Logs no terminal
console.log('Sincronizar API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});