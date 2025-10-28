const client = require('../config/database');

// Listar todos os eventos
async function listarEventos(req, res) {
    const resDb = await client.query('SELECT * FROM eventos');
    res.json(resDb[0]);
}

// Buscar evento por id
async function buscarEvento(req, res) {
    const resDb = await client.query('SELECT * FROM eventos WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

// Inserir novo evento
async function criarEvento(req, res) {
    const sql = 'INSERT INTO eventos(nome_evento, status_evento, template_certificado_id) VALUES (?, ?, ?);';
    const values = [req.body.nome_evento, req.body.status_evento, req.body.template_certificado_id];
    await client.query(sql, values);
    res.sendStatus(201);
}

// Atualizar evento
async function atualizarEvento(req, res) {
    const sql = 'UPDATE eventos SET nome_evento=?, status_evento=?, template_certificado_id=? WHERE id=?';
    const values = [req.body.nome_evento, req.body.status_evento, req.body.template_certificado_id, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

// Excluir evento
async function excluirEvento(req, res) {
    await client.query('DELETE FROM eventos WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarEventos, buscarEvento, criarEvento, atualizarEvento, excluirEvento };