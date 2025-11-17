const client = require('../config/database'); // ← caminho corrigido

//Listar todas as presenças
async function listarPresencas(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM presencas');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar presenças:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar presenças.' });
  }
}

//Buscar presença por ID
async function buscarPresenca(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM presencas WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar presença:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar presença.' });
  }
}

//Buscar presença por usuário ID
async function buscarPresencaPorUsuarioId(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM presencas WHERE usuario_id=?', [req.params.usuario_id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar presença:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar presença.' });
  }
}

//Criar nova presença (check-in)
async function criarPresenca(req, res) {
  try {
    const sql = 'INSERT INTO presencas (inscricao_id, usuario_id, evento_id) VALUES (?, ?, ?)';
    const values = [req.body.inscricao_id, req.body.usuario_id, req.body.evento_id];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar presença:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar presença.' });
  }
}

//Atualizar presença
async function atualizarPresenca(req, res) {
  try {
    const sql = 'UPDATE presencas SET inscricao_id=?, usuario_id=?, evento_id=? WHERE id=?';
    const values = [req.body.inscricao_id, req.body.usuario_id, req.body.evento_id, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar presença:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar presença.' });
  }
}

//Excluir presença
async function excluirPresenca(req, res) {
  try {
    await client.query('DELETE FROM presencas WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir presença:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir presença.' });
  }
}

module.exports = { listarPresencas, buscarPresenca, buscarPresencaPorUsuarioId, criarPresenca, atualizarPresenca, excluirPresenca };