const axios = require('axios');

async function chamarOutraApi(porta, rota, token) {
  try {
    const resposta = await axios.get(`http://localhost:${porta}/${rota}`, {
      headers: {
        Authorization: token
      }
    })
    return resposta.data
  } catch (erro) {
    console.error(`Erro ao chamar API http://localhost:${porta}/${rota}`, erro.message);
    return null
  }
}

module.exports = {chamarOutraApi}
