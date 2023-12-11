import VeiculoDAO from "../persistencia/veiculoDAO.js";

export default class Veiculo {

    #id
    #nome
    #placa
    #ano
    #marca
    #cor
    #categoria
    #km

    constructor(id, nome, placa, ano, marca, cor, categoria, km) {
        
        this.#id = id;
        this.#nome = nome,
        this.#placa = placa;
        this.#ano = ano;
        this.#marca = marca;
        this.#cor = cor;
        this.#categoria = categoria;
        this.#km = km;

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

    get placa() {
        return this.#placa;
    }

    set placa(novaPlaca) {
        this.#placa = novaPlaca;
    }

    get ano() {
        return this.#ano;
    }

    set ano(novoAno) {
        this.#ano = novoAno;
    }

    get marca() {
        return this.#marca;
    }

    set marca(novaMarca) {
        this.#marca = novaMarca;
    }

    get cor() {
        return this.#cor;
    }

    set cor(novaCor) {
        this.#cor = novaCor;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }

    get km() {
        return this.#km;
    }

    set km(novaKm) {
        this.#km = novaKm;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.#nome,
            placa: this.#placa,
            ano: this.#ano,
            marca: this.#marca,
            cor: this.#cor,
            categoria: this.#categoria,
            km: this.#km
        };
    }

    async gravar() {
        const veicDAO = new VeiculoDAO();
        await veicDAO.gravar(this);
    }

    async atualizar() {
        const veicDAO = new VeiculoDAO();
        await veicDAO.atualizar(this);
    }

    async excluir() {
        const veicDAO = new VeiculoDAO();
        await veicDAO.excluir(this);
    }

    async consultar() {
        const veicDAO = new VeiculoDAO();
        return await veicDAO.consultar(this);
    }

}