const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const generateCSV = require('../services/generateCSV');

dotenv.config({ path: '../.env' });

const app = express();
// app.use(express.json())
// VER DO EXPRESS.JSON
//Registrar logs em arquivo
function registrarLog(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}\n`;
  fs.appendFileSync(path.join(__dirname, 'gateway.log'), log);
  next();
}
app.use(registrarLog);

//Proxy para cada microserviço
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true,
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    error: (err, req, res) => {
      console.log(err)
      if(req.path == '/auth/login') {
        generateCSV.adicionarRegistro(req.body.email, undefined)
      }
    }
  },
}));

app.use('/usuarios', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true, 
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    error: (err, req, res) => {
      if (req.path == '/register') {
        generateCSV.adicionarRegistro(req.body.email, "123")
      }
    }
  }
}));

app.use('/logs', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.use('/eventos', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

app.use('/inscricoes', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true,
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    error: (err, req, res) => {
      if(req.path == '/inscricoes') {
        generateCSV.anexarCamposPorEmail(req.body.email, [req.body.evento_id])
      }
    }
  }
}));

app.use('/presencas', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true,
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    error: (err, req, res) => {
      console.log(req.path)
      console.log(req.body)
      if(req.path == '/presencas') {
        generateCSV.anexarCamposPorEmail(req.body.email, ['true'])
      }
    }
  } 
}));

app.use('/certificados', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.use('/emails', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));

app.use('/sincronizar', createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));

//Opcional: Proxy para documentação centralizada
app.use('/docs', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
