require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();

//Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const logAcessoRoutes = require('./routes/logAcessoRoutes');

//Middleware para tratar JSON
app.use(express.json());

//Rotas principais
app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes);
app.use('/logs', logAcessoRoutes);

//Porta configurada no .env
const PORT = Number(process.env.USUARIOS_PORT) || 3003;

//Logs no terminal
console.log('Usuários API rodando na porta', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express escutando na porta ${PORT}`);
});