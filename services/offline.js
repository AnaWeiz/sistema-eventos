/**
 * x Rota para Sincronizar
 * terá um único parâmetro de um CSV.
 * Esse CSV ao chegar no método do sincronizar, será aberto e lido com o método lerRegistros do generateCSV.js
 * Passo 1 - Verificar existencia de usuario através do email
 * Passo 2 - Se existir ir para o PASSO 4
 * Passo 3 - Se não existir, criar usuário
 * Passo 4 - Pegar o ID do usuário
 * Passo 5 - Criar inscrição do evento que também está com o ID no CSV
 * Passo 6 - Criar presença com USUARIO_ID, EVENTO_ID, INSCRICAO_ID
 */
