class FilaSincronizacao {
    constructor({ id, tabela, id_local, dados, processado, id_servidor }) {
        this.id = id;
        this.tabela = tabela;
        this.id_local = id_local;
        this.dados = dados;
        this.processado = processado;
        this.id_servidor = id_servidor;
    }
}

module.exports = FilaSincronizacao;