require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();

const notificacaoRoutes = require('./routes/notificacaoRoutes');

app.use(express.json());
app.use('/notificacoes', notificacaoRoutes);

const PORT = Number(process.env.NOTIFICACOES_PORT) || 3004;
console.log('Notificações API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});
