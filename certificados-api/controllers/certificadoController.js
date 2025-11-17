const PDFDocument = require('pdfkit');
const fs = require('fs');
const bcrypt = require('bcrypt');
const client = require('../config/database');
const axiosRequest = require('../../services/axiosApiService.js');

//Listar todos os certificados
async function listarCertificados(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM certificados');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar certificados:', error.message);
    res.status(500).json({ erro: 'Erro interno ao listar certificados.' });
  }
}

//Buscar certificado por ID
async function buscarCertificado(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM certificados WHERE id=?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar certificado.' });
  }
}

//Buscar certificado por hash
async function buscarCertificadoPorHash(req, res) {
  try {
    const [rows] = await client.query('SELECT * FROM certificados WHERE codigo_autenticacao=?', [req.body.codigo_autenticacao]);

    const token = req.headers.authorization;

    const usuario = await axiosRequest.chamarOutraApi(3000, `usuarios/usuarios/${rows[0].usuario_id}`, token);

    if(!usuario || usuario.length === 0){
      res.status(401).json({ erro: 'Usuário não encontrados' });
    }

    const evento = await axiosRequest.chamarOutraApi(3000, `eventos/eventos/${rows[0].evento_id}`, token);

    if(!evento || evento.length === 0){
      res.status(401).json({ erro: 'Evento não encontrados' });
    }

    if (rows.length > 0) {
      gerarPDF(res, usuario.nome, evento.nome_evento, req.params.codigo_autenticacao)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Erro ao buscar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao buscar certificado.' });
  }
}

//Criar novo certificado
async function criarCertificado(req, res) {
  const { usuario_email, evento_id } = req.body;
  const token = req.headers.authorization;
  const usuario = await axiosRequest.chamarOutraApi(3000, `usuarios/usuarios?email=${usuario_email}`, token);
  if(!usuario || usuario.length === 0){
    res.status(401).json({ erro: 'Usuário não encontrados' });
  }

  const evento = await axiosRequest.chamarOutraApi(3000, `eventos/eventos/${evento_id}`, token);

  if(!evento || evento.length === 0){
    res.status(401).json({ erro: 'Evento não encontrados' });
  }
  const presenca = await axiosRequest.chamarOutraApi(3000, `presencas/presencas/presencaUsuario/${usuario[0].id}`, token);

  if(!presenca || presenca.length === 0){
    res.status(401).json({ erro: 'Presenca não encontrados' });
  }

  try {
    const hash = await gerarHash();
    const sql = `
      INSERT INTO certificados (codigo_autenticacao, usuario_id, evento_id, presenca_id)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      hash,
      usuario[0].id,
      evento.id,
      presenca.id,
    ];
    await client.query(sql, values);
    return gerarPDF(res, usuario[0].nome, evento.nome_evento, hash);
  } catch (error) {
    console.error('Erro ao criar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao criar certificado.' });
  }
}

//Atualizar certificado
async function atualizarCertificado(req, res) {
  try {
    const sql = `
      UPDATE certificados 
      SET codigo_autenticacao=?, usuario_id=?, evento_id=?, presenca_id=? 
      WHERE id=?
    `;
    const values = [
      req.body.codigo_autenticacao,
      req.body.usuario_id,
      req.body.evento_id,
      req.body.presenca_id,
      req.params.id,
    ];
    await client.query(sql, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao atualizar certificado.' });
  }
}

//Excluir certificado
async function excluirCertificado(req, res) {
  try {
    await client.query('DELETE FROM certificados WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir certificado:', error.message);
    res.status(500).json({ erro: 'Erro interno ao excluir certificado.' });
  }
}

async function gerarPDF(res, nomeAluno, nomeEvento, codigoCertificado) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=certificado.pdf');
  const doc = new PDFDocument();
  doc.pipe(res);
  // doc.pipe(fs.createWriteStream('arquivo.pdf'));
  doc.fontSize(16).text(`Parabéns ${nomeAluno}, aqui está seu certificado do evento ${nomeEvento}`, 100, 100);
  doc.moveDown().fontSize(12).text(`Aqui está seu código de verificação: ${codigoCertificado}`);
  doc.end();
}

async function gerarHash(){
  const numero = Math.floor(Math.random() * 1000000) + 1;
  const hash = await bcrypt.hash(String(numero), 10);
  
  return hash;
}

module.exports = { listarCertificados, buscarCertificado, buscarCertificadoPorHash, criarCertificado, atualizarCertificado, excluirCertificado };