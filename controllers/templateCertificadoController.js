const client = require('../config/database');

// Listar todos os templates
async function listarTemplates(req, res) {
    const resDb = await client.query('SELECT * FROM template_certificado');
    res.json(resDb[0]);
}

// Buscar template por id
async function buscarTemplate(req, res) {
    const resDb = await client.query('SELECT * FROM template_certificado WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

// Inserir novo template
async function criarTemplate(req, res) {
    const sql = 'INSERT INTO template_certificado(nome_template, conteudo_html) VALUES (?, ?);';
    const values = [req.body.nome_template, req.body.conteudo_html];
    await client.query(sql, values);
    res.sendStatus(201);
}

// Atualizar template
async function atualizarTemplate(req, res) {
    const sql = 'UPDATE template_certificado SET nome_template=?, conteudo_html=? WHERE id=?';
    const values = [req.body.nome_template, req.body.conteudo_html, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

// Excluir template
async function excluirTemplate(req, res) {
    await client.query('DELETE FROM template_certificado WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarTemplates, buscarTemplate, criarTemplate, atualizarTemplate, excluirTemplate };