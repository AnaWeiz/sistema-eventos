class LogAcesso {
    constructor({ id, usuario_id, endpoint, metodo, status_code }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.endpoint = endpoint;
        this.metodo = metodo;
        this.status_code = status_code;
    }
}

module.exports = LogAcesso;