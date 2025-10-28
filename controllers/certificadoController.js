const client = require('../config/database');

async function listarCertificados(req, res) {
    const resDb = await client.query('SELECT * FROM certificados');
    res.json(resDb[0]);
}

async function buscarCertificado(req, res) {
    const resDb = await client.query('SELECT * FROM certificados WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

async function criarCertificado(req, res) {
    const sql = 'INSERT INTO certificados(codigo_autenticacao, usuario_id, evento_id, presenca_id, url_validacao) VALUES (?, ?, ?, ?, ?);';
    const values = [req.body.codigo_autenticacao, req.body.usuario_id, req.body.evento_id, req.body.presenca_id, req.body.url_validacao];
    await client.query(sql, values);
    res.sendStatus(201);
}

async function atualizarCertificado(req, res) {
    const sql = 'UPDATE certificados SET codigo_autenticacao=?, usuario_id=?, evento_id=?, presenca_id=?, url_validacao=? WHERE id=?';
    const values = [req.body.codigo_autenticacao, req.body.usuario_id, req.body.evento_id, req.body.presenca_id, req.body.url_validacao, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

async function excluirCertificado(req, res) {
    await client.query('DELETE FROM certificados WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarCertificados, buscarCertificado, criarCertificado, atualizarCertificado, excluirCertificado };