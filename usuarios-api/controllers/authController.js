const crypto = require('crypto');
const client = require('../config/database');

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe email e senha.' });
  }

  try {
    //Valida credenciais
    const [rows] = await client.query(
      'SELECT id, nome, email FROM usuarios WHERE email=? AND senha=?',
      [email, senha]
    );

    if (!rows[0]) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const usuario = rows[0];

    //Cria token simples e expiração (2h)
    const token = crypto.randomBytes(32).toString('hex');
    const expiraEm = new Date(Date.now() + 2 * 60 * 60 * 1000); // agora + 2h

    //Grava sessão
    await client.query(
      'INSERT INTO sessoes (usuario_id, token, expira_em) VALUES (?, ?, ?)',
      [usuario.id, token, expiraEm]
    );

    //Retorna token e dados básicos do usuário
    return res.status(200).json({
      token,
      expira_em: expiraEm.toISOString(),
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });
  } catch (error) {
    console.error('Erro no login:', error.message);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = { login };