const client = require('../config/database');
const axiosRequest = require('../../services/axiosApiService');

//Listar todas as inscrições
async function listarInscricoes(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM inscricoes');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar inscrições:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar inscrições.' });
  }
}

//Buscar inscrição por ID
async function buscarInscricao(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM inscricoes WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar inscrição.' });
  }
}

// Buscar inscrição por usuarioID
async function buscarInscricaoPorUsuarioID(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM inscricoes WHERE usuario_id=?', [req.params.usuario_id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.error('Erro ao buscar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar inscrição.' });
  }
}

//Criar nova inscrição
async function criarInscricao(req, res) {
  try {
    const token = req.headers.authorization;
    const sql =
      'INSERT INTO inscricoes (usuario_id, evento_id) VALUES (?, ?)';
    const values = [
      req.body.usuario_id,
      req.body.evento_id,
    ];
    await client.query(sql, values);

    console.log(req.body.usuario_id)
    const usuarioDetails = await axiosRequest.get(3000, `usuarios/usuarios/${req.body.usuario_id}`, token)
    const inscricaoData = {
      para: usuarioDetails.email,
      assunto: "Inscrição efetuada com sucesso",
      texto: "Inscrição efetuada com sucesso!"
    }
    
    axiosRequest.post(3000, 'emails/notificacoes/email/', inscricaoData)
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao criar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar inscrição.' });
  }
}

//Atualizar inscrição
async function atualizarInscricao(req, res) {
  try {
    const sql =
      'UPDATE inscricoes SET usuario_id=?, evento_id=? WHERE id=?';
    const values = [
      req.body.usuario_id,
      req.body.evento_id,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar inscrição.' });
  }
}

//Excluir inscrição
async function excluirInscricao(req, res) {
  try {
    const token = req.headers.authorization;
    const inscricaoDetails = await axiosRequest.get(3000, `inscricoes/inscricoes/${req.params.id}`, token)
    const usuarioDetails = await axiosRequest.get(3000, `usuarios/usuarios/${inscricaoDetails.usuario_id}`, token)
    await client.query('DELETE FROM inscricoes WHERE id=?', [req.params.id]);

    const inscricaoData = {
      para: usuarioDetails.email,
      assunto: "Inscrição cancelada",
      texto: "Inscrição cancelada com sucesso!"
    }
    
    axiosRequest.post(3000, 'emails/notificacoes/email/', inscricaoData)
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir inscrição:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir inscrição.' });
  }
}

module.exports = { listarInscricoes, buscarInscricao, buscarInscricaoPorUsuarioID, criarInscricao, atualizarInscricao, excluirInscricao };