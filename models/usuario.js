// Modelo de usuário (usado para validação ou ORM futuramente)
class Usuario {
    constructor({ id, nome, email, senha, cadastro_completo }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cadastro_completo = cadastro_completo;
    }
}

module.exports = Usuario;