class Presenca {
    constructor({ id, inscricao_id, usuario_id, evento_id }) {
        this.id = id;
        this.inscricao_id = inscricao_id;
        this.usuario_id = usuario_id;
        this.evento_id = evento_id;
    }
}

module.exports = Presenca;