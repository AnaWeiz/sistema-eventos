const client = require('../config/database'); 

//Listar todos os logs
async function listarLogs(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM log_acesso ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar logs:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar logs.' });
  }
}

//Buscar log específico por ID
async function buscarLog(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM log_acesso WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar log:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar log.' });
  }
}

//Criar novo log
async function criarLog(req, res) {
  try {
    const sql = 'INSERT INTO log_acesso (usuario_id, endpoint, metodo, status_code) VALUES (?, ?, ?, ?)';
    const values = [req.body.usuario_id, req.body.endpoint, req.body.metodo, req.body.status_code];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar log:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar log.' });
  }
}

//Atualizar log
async function atualizarLog(req, res) {
  try {
    const sql = 'UPDATE log_acesso SET usuario_id=?, endpoint=?, metodo=?, status_code=? WHERE id=?';
    const values = [
      req.body.usuario_id,
      req.body.endpoint,
      req.body.metodo,
      req.body.status_code,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar log:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar log.' });
  }
}

//Excluir log
async function excluirLog(req, res) {
  try {
    await client.query('DELETE FROM log_acesso WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir log:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir log.' });
  }
}

module.exports = { listarLogs, buscarLog, criarLog, atualizarLog, excluirLog };