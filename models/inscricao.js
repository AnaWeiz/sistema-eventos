class Inscricao {
    constructor({ id, usuario_id, evento_id, status_inscricao }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.evento_id = evento_id;
        this.status_inscricao = status_inscricao;
    }
}

module.exports = Inscricao;