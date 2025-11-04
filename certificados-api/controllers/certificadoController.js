const client = require('../config/database');

//Listar todos os certificados
async function listarCertificados(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM certificados');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar certificados:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar certificados.' });
  }
}

//Buscar certificado por ID
async function buscarCertificado(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM certificados WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar certificado.' });
  }
}

//Criar novo certificado
async function criarCertificado(req, res) {
  try {
    const sql = `
      INSERT INTO certificados (codigo_autenticacao, usuario_id, evento_id, presenca_id, url_validacao)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      req.body.codigo_autenticacao,
      req.body.usuario_id,
      req.body.evento_id,
      req.body.presenca_id,
      req.body.url_validacao,
    ];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar certificado.' });
  }
}

//Atualizar certificado
async function atualizarCertificado(req, res) {
  try {
    const sql = `
      UPDATE certificados 
      SET codigo_autenticacao=?, usuario_id=?, evento_id=?, presenca_id=?, url_validacao=? 
      WHERE id=?
    `;
    const values = [
      req.body.codigo_autenticacao,
      req.body.usuario_id,
      req.body.evento_id,
      req.body.presenca_id,
      req.body.url_validacao,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar certificado.' });
  }
}

//Excluir certificado
async function excluirCertificado(req, res) {
  try {
    await client.query('DELETE FROM certificados WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir certificado.' });
  }
}

module.exports = { listarCertificados, buscarCertificado, criarCertificado, atualizarCertificado, excluirCertificado };