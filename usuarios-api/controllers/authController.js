const db = require('../config/database');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Informe email e senha.' });
    }

    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (users.length === 0 || users[0].senha !== senha) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const { senha: _, ...usuarioSemSenha } = users[0];
    res.status(200).json({ token, usuario: usuarioSemSenha });
  } catch (error) {
    console.error('Erro ao logar:', error.message);
    res.status(500).json({ erro: 'Erro interno ao logar.' });
  }
}

module.exports = { login };