const transporter = require('../config/emailConfig');

//Enviar e-mail
async function enviarEmail(req, res) {
  const { para, assunto, texto, html } = req.body;

  if (!para || !assunto || (!texto && !html)) {
    return res.status(400).json({ erro: 'Campos obrigatórios: para, assunto e texto/html.' });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, //remetente definido no .env
      to: para,
      subject: assunto,
      text: texto,
      html: html || `<p>${texto}</p>`
    });

    console.log(`E-mail enviado com sucesso: ${info.messageId}`);
    res.status(200).json({ sucesso: true, mensagem: 'E-mail enviado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao enviar e-mail:', erro);
    res.status(500).json({ erro: 'Falha ao enviar o e-mail.', detalhes: erro.message });
  }
}

module.exports = { enviarEmail };