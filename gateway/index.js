const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const generateCSV = require('../services/generateCSV');

dotenv.config({ path: '../.env' });

const app = express();

//Registrar logs em arquivo
function registrarLog(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}\n`;
  fs.appendFileSync(path.join(__dirname, 'gateway.log'), log);
  next();
}
app.use(registrarLog);

//Proxy para cada microserviço com offline
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true,
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Captura o body APENAS para poder usar no error handler
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        let chunks = [];
        
        req.on('data', chunk => {
          chunks.push(chunk);
        });
        
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            req.bodyBackup = JSON.parse(buffer.toString());
          } catch (e) {
            req.bodyBackup = {};
          }
        });
      }
    },
    error: (err, req, res) => {
      if(req.path == '/auth/login') {
        generateCSV.adicionarRegistro(req.bodyBackup.email, undefined)
      }
    }
  },
}));
app.use('/usuarios', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true, 
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Captura o body APENAS para poder usar no error handler
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        let chunks = [];
        
        req.on('data', chunk => {
          chunks.push(chunk);
        });
        
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            req.bodyBackup = JSON.parse(buffer.toString());
          } catch (e) {
            req.bodyBackup = {};
          }
        });
      }
    },
    error: (err, req, res) => {
      if (req.path == '/register') {
        generateCSV.adicionarRegistro(req.bodyBackup.email, "123")
      }
    }
  }
}));
app.use('/inscricoes', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true,
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Captura o body APENAS para poder usar no error handler
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        let chunks = [];
        
        req.on('data', chunk => {
          chunks.push(chunk);
        });
        
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            req.bodyBackup = JSON.parse(buffer.toString());
          } catch (e) {
            req.bodyBackup = {};
          }
        });
      }
    },
    error: (err, req, res) => {
      if(req.path == '/inscricoes') {
        generateCSV.anexarCamposPorEmail(req.bodyBackup.email, [req.bodyBackup.senha, req.bodyBackup.usuario_id, req.bodyBackup.evento_id])
      }
    }
  }
}));
app.use('/presencas', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true,
  proxyTimeout: 2000,
  timeout: 2000,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Captura o body APENAS para poder usar no error handler
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        let chunks = [];
        
        req.on('data', chunk => {
          chunks.push(chunk);
        });
        
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            req.bodyBackup = JSON.parse(buffer.toString());
          } catch (e) {
            req.bodyBackup = {};
          }
        });
      }
    },
    error: (err, req, res) => {
      console.log(req.path)
      console.log(req.body)
      if(req.path == '/presencas') {
        generateCSV.anexarCamposPorEmail(req.bodyBackup.email, [req.bodyBackup.senha, req.bodyBackup.usuario_id, req.bodyBackup.evento_id, req.bodyBackup.inscricao_id])
      }
    }
  } 
}));
//Proxy para cada microserviço sem offline
app.use('/logs', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/eventos', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/certificados', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/emails', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
app.use('/sincronizar', createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));

//Opcional: Proxy para documentação centralizada
app.use('/docs', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
