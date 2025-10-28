// Modelo de template de certificado
class TemplateCertificado {
    constructor({ id, nome_template, conteudo_html }) {
        this.id = id;
        this.nome_template = nome_template;
        this.conteudo_html = conteudo_html;
    }
}

module.exports = TemplateCertificado;