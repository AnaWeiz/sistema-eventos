const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

//Testa a conexão ao iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar ao servidor de e-mail:', error.message);
  } else {
    console.log('Conexão com servidor de e-mail estabelecida com sucesso');
  }
});

module.exports = transporter;