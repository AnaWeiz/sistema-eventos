const axios = require('axios');

async function get(porta, rota, token) {
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

async function post(porta, rota, data, token){
  try {
    const config = {};
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    const response = await axios.post(`http://localhost:${porta}/${rota}`, data, config)
    return response.data
  } catch (erro) {
    console.error(`Erro ao chamar API http://localhost:${porta}/${rota}`, erro.message);
    return null
  }
}

module.exports = { get, post }
