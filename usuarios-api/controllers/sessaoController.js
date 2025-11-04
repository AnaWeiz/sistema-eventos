const client = require('../config/database'); 

//Listar todas as sessões
async function listarSessoes(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM sessoes');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar sessões:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar sessões.' });
  }
}

//Buscar sessão por ID
async function buscarSessao(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM sessoes WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar sessão:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar sessão.' });
  }
}

//Criar nova sessão
async function criarSessao(req, res) {
  try {
    const sql = 'INSERT INTO sessoes (usuario_id, token, expira_em) VALUES (?, ?, ?)';
    const values = [req.body.usuario_id, req.body.token, req.body.expira_em];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar sessão:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar sessão.' });
  }
}

//Excluir sessão
async function excluirSessao(req, res) {
  try {
    await client.query('DELETE FROM sessoes WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir sessão:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir sessão.' });
  }
}

module.exports = { listarSessoes, buscarSessao, criarSessao, excluirSessao };