const client = require('../config/database'); // ← caminho corrigido

//Listar todas as inscrições
async function listarInscricoes(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM inscricoes');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar inscrições:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar inscrições.' });
  }
}

//Buscar inscrição por ID
async function buscarInscricao(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM inscricoes WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar inscrição.' });
  }
}

//Criar nova inscrição
async function criarInscricao(req, res) {
  try {
    const sql =
      'INSERT INTO inscricoes (usuario_id, evento_id, status_inscricao) VALUES (?, ?, ?)';
    const values = [
      req.body.usuario_id,
      req.body.evento_id,
      req.body.status_inscricao,
    ];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar inscrição.' });
  }
}

//Atualizar inscrição
async function atualizarInscricao(req, res) {
  try {
    const sql =
      'UPDATE inscricoes SET usuario_id=?, evento_id=?, status_inscricao=? WHERE id=?';
    const values = [
      req.body.usuario_id,
      req.body.evento_id,
      req.body.status_inscricao,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar inscrição.' });
  }
}

//Excluir inscrição
async function excluirInscricao(req, res) {
  try {
    await client.query('DELETE FROM inscricoes WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir inscrição.' });
  }
}

module.exports = { listarInscricoes, buscarInscricao, criarInscricao, atualizarInscricao, excluirInscricao };