const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '../.env' });

const app = express();
app.use(bodyParser.json());

//Registrar logs em arquivo
function registrarLog(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}\n`;
  fs.appendFileSync(path.join(__dirname, 'gateway.log'), log);
  next();
}
app.use(registrarLog);

//Autenticação JWT
app.use((req, res, next) => {
  //Rotas públicas
  const rotasPublicas = [
    /^\/auth/,
    /^\/usuarios/,
    /^\/docs/,
  ];
  if (rotasPublicas.some(r => r.test(req.path))) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não informado' });
  const token = authHeader.replace('Bearer ', '');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido' });
  }
});

//Proxy para cada microserviço
app.use('/eventos', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/inscricoes', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/presencas', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

app.use('/certificados', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/template-certificados', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.use('/usuarios', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.use('/emails', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));

app.use('/sincronizacao', createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));

//Opcional: Proxy para documentação centralizada
app.use('/docs', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
