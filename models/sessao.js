class Sessao {
    constructor({ id, usuario_id, token, expira_em }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.token = token;
        this.expira_em = expira_em;
    }
}

module.exports = Sessao;