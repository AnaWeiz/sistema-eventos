const client = require('../config/database');
const bcrypt = require('bcrypt');

//Listar todos os usuários
async function listarUsuarios(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar usuários.' });
  }
}

//Buscar usuário por id
async function buscarUsuario(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM usuarios WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
  }
}

//Inserir novo usuário
async function criarUsuario(req, res) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash( req.body.senha, saltRounds)
    const sql =
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?, ?)';
    const values = [
      req.body.nome,
      req.body.email,
      hashedPassword,
    ];
    
    const newUser = await client.query(sql, values);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar usuário.' });
  }
}

//Atualizar usuário
async function atualizarUsuario(req, res) {
  try {
    const sql =
      'UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?';
    const values = [
      req.body.nome,
      req.body.email,
      req.body.senha,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar usuário.' });
  }
}

//Excluir usuário
async function excluirUsuario(req, res) {
  try {
    await client.query('DELETE FROM usuarios WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir usuário:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir usuário.' });
  }
}

module.exports = { listarUsuarios, buscarUsuario, criarUsuario, atualizarUsuario, excluirUsuario };
