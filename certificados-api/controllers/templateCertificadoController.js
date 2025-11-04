const client = require('../config/database');

//Listar todos os templates de certificado
async function listarTemplates(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM template_certificado');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar templates:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar templates.' });
  }
}

//Buscar template por ID
async function buscarTemplate(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM template_certificado WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar template:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar template.' });
  }
}

//Criar novo template
async function criarTemplate(req, res) {
  try {
    const sql = `
      INSERT INTO template_certificado (nome_template, conteudo_html)
      VALUES (?, ?)
    `;
    const values = [req.body.nome_template, req.body.conteudo_html];
    await client.query(sql, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar template:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar template.' });
  }
}

//Atualizar template existente
async function atualizarTemplate(req, res) {
  try {
    const sql = `
      UPDATE template_certificado
      SET nome_template=?, conteudo_html=?
      WHERE id=?
    `;
    const values = [req.body.nome_template, req.body.conteudo_html, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar template:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar template.' });
  }
}

//Excluir template
async function excluirTemplate(req, res) {
  try {
    await client.query('DELETE FROM template_certificado WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir template:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir template.' });
  }
}

module.exports = { listarTemplates, buscarTemplate, criarTemplate, atualizarTemplate, excluirTemplate };