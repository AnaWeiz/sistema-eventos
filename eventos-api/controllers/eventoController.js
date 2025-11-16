const client = require('../config/database');

//Listar todos os eventos
async function listarEventos(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM eventos');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar eventos:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar eventos.' });
  }
}

//Buscar evento por ID
async function buscarEvento(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM eventos WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar evento:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar evento.' });
  }
}

//Criar novo evento
async function criarEvento(req, res) {
  try {
    const sql =
      'INSERT INTO eventos (nome_evento, data_final) VALUES (?, ?)';
    const values = [
      req.body.nome_evento,
      req.body.data_final,
    ];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar evento:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar evento.' });
  }
}

//Atualizar evento
async function atualizarEvento(req, res) {
  try {
    const sql =
      'UPDATE eventos SET nome_evento=?, data_final=? WHERE id=?';
    const values = [
      req.body.nome_evento,
      req.body.data_final,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar evento.' });
  }
}

//Excluir evento
async function excluirEvento(req, res) {
  try {
    await client.query('DELETE FROM eventos WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir evento:', error.message);
    // Mostre o erro real para facilitar o diagnóstico
    res.status(500).json({ erro: 'Erro interno ao excluir evento.', detalhes: error.message });
  }
}

module.exports = { listarEventos, buscarEvento, criarEvento, atualizarEvento, excluirEvento };