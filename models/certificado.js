class Certificado {
    constructor({ id, codigo_autenticacao, usuario_id, evento_id, presenca_id, url_validacao }) {
        this.id = id;
        this.codigo_autenticacao = codigo_autenticacao;
        this.usuario_id = usuario_id;
        this.evento_id = evento_id;
        this.presenca_id = presenca_id;
        this.url_validacao = url_validacao;
    }
}

module.exports = Certificado;