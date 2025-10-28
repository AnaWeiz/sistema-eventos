const client = require('../config/database');

async function listarInscricoes(req, res) {
    const resDb = await client.query('SELECT * FROM inscricoes');
    res.json(resDb[0]);
}

async function buscarInscricao(req, res) {
    const resDb = await client.query('SELECT * FROM inscricoes WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

async function criarInscricao(req, res) {
    const sql = 'INSERT INTO inscricoes(usuario_id, evento_id, status_inscricao) VALUES (?, ?, ?);';
    const values = [req.body.usuario_id, req.body.evento_id, req.body.status_inscricao];
    await client.query(sql, values);
    res.sendStatus(201);
}

async function atualizarInscricao(req, res) {
    const sql = 'UPDATE inscricoes SET usuario_id=?, evento_id=?, status_inscricao=? WHERE id=?';
    const values = [req.body.usuario_id, req.body.evento_id, req.body.status_inscricao, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

async function excluirInscricao(req, res) {
    await client.query('DELETE FROM inscricoes WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarInscricoes, buscarInscricao, criarInscricao, atualizarInscricao, excluirInscricao };