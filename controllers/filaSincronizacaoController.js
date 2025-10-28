const client = require('../config/database');

async function listarFilas(req, res) {
    const resDb = await client.query('SELECT * FROM fila_sincronizacao');
    res.json(resDb[0]);
}

async function buscarFila(req, res) {
    const resDb = await client.query('SELECT * FROM fila_sincronizacao WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

async function criarFila(req, res) {
    const sql = 'INSERT INTO fila_sincronizacao(tabela, id_local, dados, processado, id_servidor) VALUES (?, ?, ?, ?, ?);';
    const values = [req.body.tabela, req.body.id_local, req.body.dados, req.body.processado || false, req.body.id_servidor];
    await client.query(sql, values);
    res.sendStatus(201);
}

async function atualizarFila(req, res) {
    const sql = 'UPDATE fila_sincronizacao SET tabela=?, id_local=?, dados=?, processado=?, id_servidor=? WHERE id=?';
    const values = [req.body.tabela, req.body.id_local, req.body.dados, req.body.processado, req.body.id_servidor, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

async function excluirFila(req, res) {
    await client.query('DELETE FROM fila_sincronizacao WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarFilas, buscarFila, criarFila, atualizarFila, excluirFila };