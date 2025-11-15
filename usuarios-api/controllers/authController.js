const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blackListService = require('../../services/blackListService.js');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: 'Informe email e senha.' });
    }

    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const match = await bcrypt.compare(senha, users[0].senha);
    if(match){
      const token = jwt.sign(
        {
          userId: users[0].id,
          email: users[0].email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );

      res.json({
        userId: users[0].id,
        email: users[0].email,
        message: 'Login efetuado com sucesso.',
        token
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas.'});
    }
  } catch (error) {
    console.error('Erro ao logar:', error.message);
    res.status(500).json({ message: 'Erro interno ao logar.' });
  }
}

const logout = (req, res) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')){
      res.status(400).json({ message: 'Não foi entregue nenhum token.' });
    }
    
    const token = authHeader.replace('Bearer ', '').trim()

    const expirationTime = parseExpiration(process.env.JWT_EXPIRES);
    blackListService.addToken(token, expirationTime);

    res.json({
      message: 'Deslogado com sucesso.',
      token: null
    });

  } catch (error){
     res.status(500).json({ message: 'Erro interno ao deslogar.' });
  }
}

function parseExpiration(str) {
  if (!str) return 3600; // default 1h em segundos
  if (str.endsWith("s")) return parseInt(str) || 1;
  if (str.endsWith("m")) return (parseInt(str) || 1) * 60;
  if (str.endsWith("h")) return (parseInt(str) || 1) * 3600;
  if (str.endsWith("d")) return (parseInt(str) || 1) * 86400;
  return parseInt(str) || 3600;
}

module.exports = { login, logout };