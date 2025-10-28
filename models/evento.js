// Modelo de evento
class Evento {
    constructor({ id, nome_evento, status_evento, template_certificado_id }) {
        this.id = id;
        this.nome_evento = nome_evento;
        this.status_evento = status_evento;
        this.template_certificado_id = template_certificado_id;
    }
}

module.exports = Evento;