require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();

const eventoRoutes = require('./routes/eventoRoutes');
const inscricaoRoutes = require('./routes/inscricaoRoutes');
const presencaRoutes = require('./routes/presencaRoutes');

app.use(express.json());

app.use('/eventos', eventoRoutes);
app.use('/inscricoes', inscricaoRoutes);
app.use('/presencas', presencaRoutes);

const PORT = Number(process.env.EVENTOS_PORT) || 3002;

console.log('Eventos API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});