const client = require('../config/database');

//Listar todas as filas de sincronização
async function listarFilas(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM fila_sincronizacao');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar filas:', err.message);
    res.status(500).json({ erro: 'Erro ao buscar filas de sincronização' });
  }
}

//Buscar uma fila por ID
async function buscarFila(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM fila_sincronizacao WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar fila:', err.message);
    res.status(500).json({ erro: 'Erro ao buscar fila de sincronização' });
  }
}

//Criar uma fila
async function criarFila(req, res) {
  try {
    const sql = `
      INSERT INTO fila_sincronizacao (tabela, id_local, dados, processado, id_servidor)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      req.body.tabela,
      req.body.id_local,
      req.body.dados,
      req.body.processado || false,
      req.body.id_servidor || null
    ];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (err) {
    console.error('Erro ao criar fila:', err.message);
    res.status(500).json({ erro: 'Erro ao criar fila de sincronização' });
  }
}

//Atualizar uma fila
async function atualizarFila(req, res) {
  try {
    const sql = `
      UPDATE fila_sincronizacao
      SET tabela=?, id_local=?, dados=?, processado=?, id_servidor=?
      WHERE id=?
    `;
    const values = [
      req.body.tabela,
      req.body.id_local,
      req.body.dados,
      req.body.processado,
      req.body.id_servidor,
      req.params.id
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (err) {
    console.error('Erro ao atualizar fila:', err.message);
    res.status(500).json({ erro: 'Erro ao atualizar fila de sincronização' });
  }
}

//Excluir uma fila
async function excluirFila(req, res) {
  try {
    await client.query('DELETE FROM fila_sincronizacao WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Erro ao excluir fila:', err.message);
    res.status(500).json({ erro: 'Erro ao excluir fila de sincronização' });
  }
}

module.exports = { listarFilas, buscarFila, criarFila, atualizarFila, excluirFila };