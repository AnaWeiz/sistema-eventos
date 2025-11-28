const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'usuarios.csv');

// Garantir que o arquivo exista
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '');
}

function adicionarRegistro(email, senha, evento_id) {
  const linha = `${email},${senha}\n`;
  fs.appendFileSync(filePath, linha, 'utf8');
  console.log('Registro adicionado!');
}

function lerRegistros() {
  const data = fs.readFileSync(filePath, 'utf8').trim();
  if (!data) return [];
  
  return data.split('\n').map(linha => {
    const [email, senha, evento_id, usuario_id, inscricao_id, presenca_id] = linha.split(',');
    return { email, senha, evento_id, usuario_id, inscricao_id, presenca_id };
  });
}

function anexarCamposPorEmail(email, novosCampos) {
  if (!Array.isArray(novosCampos) || novosCampos.length === 0) {
    console.log('Nada a anexar: novosCampos vazio ou não é um array.');
    return;
  }

  // Lê todo o arquivo preservando quebras de linha
  const conteudo = fs.readFileSync(filePath, 'utf8');
  const linhas = conteudo.split(/\r?\n/);

  let encontrou = false;

  const novasLinhas = linhas.map(linha => {
    // Ignora linhas em branco (mantém como estão)
    if (!linha) return linha;

    // Pegar o primeiro campo (antes da primeira vírgula)
    // Se a linha não tiver vírgula, firstField será a própria linha inteira
    const primeiraVirgula = linha.indexOf(',');
    const firstField = primeiraVirgula === -1 ? linha : linha.slice(0, primeiraVirgula);

    if (firstField === email && !encontrou) {
      // Encontrou a linha a ser alterada (só altera a primeira ocorrência)
      encontrou = true;

      // Constrói a string a ser anexada (escapa nada — assume valores prontos)
      const anexos = novosCampos.map(String).join(',');

      // Se a linha atual estiver vazia (improvável aqui), só retorna anexos
      const novaLinha = linha + ',' + anexos;
      return novaLinha;
    }

    return linha;
  });

  if (!encontrou) {
    const novaLinha = [email, ...novosCampos].join(',');
    fs.appendFileSync(filePath, novaLinha + '\n', 'utf8');
    console.log('Registro não encontrado — linha adicionada com sucesso!');
    return;
  }

  // Reescreve o arquivo preservando as quebras de linha originais (final optional)
  // Se o arquivo original terminava com newline, manteremos uma newline ao final.
  const terminaComNewline = /\r?\n$/.test(conteudo);
  const novoConteudo = novasLinhas.join('\n') + (terminaComNewline ? '\n' : '');

  console.log('novo conteudo');
  fs.writeFileSync(filePath, novoConteudo, 'utf8');
  console.log('Campos anexados com sucesso!');
}

function deletarRegistro(email) {
  const registros = lerRegistros();
  const filtrados = registros.filter(r => r.email !== email);

  const linhas = filtrados.map(r => `${r.email},${r.senha},${r.evento_id}`).join('\n');
  fs.writeFileSync(filePath, linhas + (linhas ? '\n' : ''), 'utf8');

  console.log('Registro deletado!');
}

// adicionarRegistro('teste@test.com', '1234', 10);
// atualizarRegistro('teste@test.com', 'novo@teste.com', '9999', 20);
// deletarRegistro('novo@teste.com');

module.exports = { adicionarRegistro, lerRegistros, deletarRegistro, anexarCamposPorEmail }