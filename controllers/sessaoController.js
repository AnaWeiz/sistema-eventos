const client = require('../config/database');

async function listarSessoes(req, res) {
    const resDb = await client.query('SELECT * FROM sessoes');
    res.json(resDb[0]);
}

async function buscarSessao(req, res) {
    const resDb = await client.query('SELECT * FROM sessoes WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

async function criarSessao(req, res) {
    const sql = 'INSERT INTO sessoes(usuario_id, token, expira_em) VALUES (?, ?, ?);';
    const values = [req.body.usuario_id, req.body.token, req.body.expira_em];
    await client.query(sql, values);
    res.sendStatus(201);
}

async function atualizarSessao(req, res) {
    const sql = 'UPDATE sessoes SET usuario_id=?, token=?, expira_em=? WHERE id=?';
    const values = [req.body.usuario_id, req.body.token, req.body.expira_em, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

async function excluirSessao(req, res) {
    await client.query('DELETE FROM sessoes WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarSessoes, buscarSessao, criarSessao, atualizarSessao, excluirSessao };