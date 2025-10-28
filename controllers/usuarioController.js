const client = require('../config/database');

// Listar todos os usuários
async function listarUsuarios(req, res) {
    const resDb = await client.query('SELECT * FROM usuarios');
    res.json(resDb[0]);
}

// Buscar usuário por id
async function buscarUsuario(req, res) {
    const resDb = await client.query('SELECT * FROM usuarios WHERE id=?', [req.params.id]);
    if (resDb[0][0]) {
        res.json(resDb[0][0]);
    } else {
        res.sendStatus(404);
    }
}

// Inserir novo usuário
async function criarUsuario(req, res) {
    const sql = 'INSERT INTO usuarios(nome, email, senha, cadastro_completo) VALUES (?, ?, ?, ?);';
    const values = [req.body.nome, req.body.email, req.body.senha, req.body.cadastro_completo || false];
    await client.query(sql, values);
    res.sendStatus(201);
}

// Atualizar usuário
async function atualizarUsuario(req, res) {
    const sql = 'UPDATE usuarios SET nome=?, email=?, senha=?, cadastro_completo=? WHERE id=?';
    const values = [req.body.nome, req.body.email, req.body.senha, req.body.cadastro_completo, req.params.id];
    await client.query(sql, values);
    res.sendStatus(200);
}

// Excluir usuário
async function excluirUsuario(req, res) {
    await client.query('DELETE FROM usuarios WHERE id=?;', [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listarUsuarios, buscarUsuario, criarUsuario, atualizarUsuario, excluirUsuario };