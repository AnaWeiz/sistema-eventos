const client = require('../config/database');

async function listarLogs(req, res) {
    const resDb = await client.query('SELECT * FROM logs_acesso');
    res.json(resDb[0]);
}

async function buscarLog(req, res) {
    const resDb = await client.query('SELECT * FROM logs_acesso WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

async function criarLog(req, res) {
    const sql = 'INSERT INTO logs_acesso(usuario_id, endpoint, metodo, status_code) VALUES (?, ?, ?, ?);';
    const values = [req.body.usuario_id, req.body.endpoint, req.body.metodo, req.body.status_code];
    await client.query(sql, values);
    res.sendStatus(201);
}

async function atualizarLog(req, res) {
    const sql = 'UPDATE logs_acesso SET usuario_id=?, endpoint=?, metodo=?, status_code=? WHERE id=?';
    const values = [req.body.usuario_id, req.body.endpoint, req.body.metodo, req.body.status_code, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

async function excluirLog(req, res) {
    await client.query('DELETE FROM logs_acesso WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarLogs, buscarLog, criarLog, atualizarLog, excluirLog };