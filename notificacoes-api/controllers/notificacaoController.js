const nodemailer = require('nodemailer');

function enviarEmail(req, res) {
  const { para, assunto, texto, html } = req.body;

  if (!para || !assunto || (!texto && !html)) {
    return res.status(400).json({ erro: 'Campos obrigatórios: para, assunto e texto/html.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: para,
      subject: assunto,
      text: texto,
      html: html || `<p>${texto}</p>`
    });
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    return res.status(200).json({ 
      sucesso: true, 
      mensagem: 'E-mail enviado com sucesso!',
      messageId: info.messageId
    });
  } catch (erro) {
    console.error('Erro ao enviar e-mail:', erro);
    res.status(500).json({ erro: 'Falha ao enviar o e-mail.', detalhes: erro.message });
  }
}

module.exports = { enviarEmail };
