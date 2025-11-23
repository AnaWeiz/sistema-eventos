const axiosRequest = require('../../services/axiosApiService.js');
const generateCSV = require('../../services/generateCSV.js');

async function sincronizar(req, res) {
  try {
    const token = req.headers.authorization;
    const linhasCSV = generateCSV.lerRegistros();
    console.log(linhasCSV)

    for(const objeto of linhasCSV) {
      let usuario = await axiosRequest.get(3000, `usuarios/usuarios/porEmail/${objeto.email}`, token);
      let usuarioID
      if(!usuario){
        const novoUsuarioData = {
          email: objeto.email,
          senha: '123',
        }
        const novoUsuario = await axiosRequest.post(3000, 'usuarios/register', novoUsuarioData, token)
        usuarioID = novoUsuario.id
      } else {
        usuarioID = usuario.id
      }

      const inscricao = await axiosRequest.get(3000, `inscricoes/inscricoes/porUserID/${usuarioID}`, token);
      let inscricaoID
      if(!inscricao) {
        const inscricaoData = {
          usuario_id: usuarioID,
          evento_id: objeto.evento_id
        }
        const novaInscricao = await axiosRequest.post(3000, 'inscricoes/inscricoes/', inscricaoData, token)
        inscricaoID = novaInscricao.id
      } else {
        inscricaoID = inscricao.id
      }

      const presenca = await axiosRequest.get(3000, `presencas/presencas/presencaUsuario/${usuarioID}`, token)
      let presencaID
      if(!presenca){
        const presencaData = {
          inscricao_id: inscricaoID,
          usuario_id: usuarioID,
          evento_id: objeto.evento_id
        }

        const novaPresenca = await axiosRequest.post(3000, 'presencas/presencas/', presencaData, token)
        presencaID = novaPresenca.id
      } else {
        presencaID = presenca.id
      }
    }

    res.status(200).json({ sucesso: true, dados: linhasCSV });
  } catch (error) {
    console.error('Erro ao sincronizar:', error.message);
    res.status(500).json({ erro: 'Erro interno ao sincronizar.' });
  }
}

module.exports = { sincronizar }