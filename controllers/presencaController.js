const client = require('../config/database');

async function listarPresencas(req, res) {
    const resDb = await client.query('SELECT * FROM presencas');
    res.json(resDb[0]);
}

async function buscarPresenca(req, res) {
    const resDb = await client.query('SELECT * FROM presencas WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

async function criarPresenca(req, res) {
    const sql = 'INSERT INTO presencas(inscricao_id, usuario_id, evento_id) VALUES (?, ?, ?);';
    const values = [req.body.inscricao_id, req.body.usuario_id, req.body.evento_id];
    await client.query(sql, values);
    res.sendStatus(201);
}

async function atualizarPresenca(req, res) {
    const sql = 'UPDATE presencas SET inscricao_id=?, usuario_id=?, evento_id=? WHERE id=?';
    const values = [req.body.inscricao_id, req.body.usuario_id, req.body.evento_id, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

async function excluirPresenca(req, res) {
    await client.query('DELETE FROM presencas WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarPresencas, buscarPresenca, criarPresenca, atualizarPresenca, excluirPresenca };