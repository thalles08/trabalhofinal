import MotoristaDAO from "../persistencia/motoristaDAO.js";

export default class Motorista {

    #id
    #nome
    #cpf
    #dataNascimento
    #email
    #telefone
    #cep
    #endereco
    #bairro
    #cidade
    #categoria
    #cnh

    constructor(id, nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria, cnh) {
        
        this.#id = id;
        this.#nome = nome,
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
        this.#email = email;
        this.#telefone = telefone;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#categoria = categoria;
        this.#cnh = cnh;

    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(novaDataNascim) {
        this.#dataNascimento = novaDataNascim;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get cep() {
        return this.#cep
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }

    get cnh() {
        return this.#cnh;
    }

    set cnh(novaCnh) {
        this.#cnh = novaCnh;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.#nome,
            cpf: this.#cpf,
            dataNascimento: this.#dataNascimento,
            email: this.#email,
            telefone: this.#telefone,
            cep: this.#cep,
            endereco: this.#endereco,
            bairro: this.#bairro,
            cidade: this.#cidade,
            categoria: this.#categoria,
            cnh: this.#cnh
        };
    }

    async gravar() {
        const motDAO = new MotoristaDAO();
        await motDAO.gravar(this);
    }

    async atualizar() {
        const motDAO = new MotoristaDAO();
        await motDAO.atualizar(this);
    }

    async excluir() {
        const motDAO = new MotoristaDAO();
        await motDAO.excluir(this);
    }

    async consultar() {
        const motDAO = new MotoristaDAO();
        await motDAO.consultar(this);
    }

}