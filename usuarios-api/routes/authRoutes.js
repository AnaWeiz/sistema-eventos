const express = require('express');
const router = express.Router();
const db = require('../../auth-api/config/database');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe email e senha.' });
  }

  const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

  if (users.length === 0 || users[0].senha !== senha) {
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  await db.query(
    'INSERT INTO sessoes (usuario_id, token, expira_em) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))',
    [users[0].id, token]
  );

  const { senha: _, ...usuarioSemSenha } = users[0];
  res.status(200).json({ token, usuario: usuarioSemSenha });
});

module.exports = router;