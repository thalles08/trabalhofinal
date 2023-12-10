import Veiculo from "../modelo/veiculo.js";
import Conectar from "./conexao.js";

export default class VeiculoDAO {

    async gravar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const conexao = await Conectar();
            const sql = "INSERT INTO veiculo (nome, placa, ano, marca, cor, categoria, km) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const parametros = [veiculo.nome, veiculo.placa, veiculo.ano, veiculo.marca, veiculo.cor, veiculo.categoria, veiculo.km];
            const resultado = await conexao.query(sql, parametros);
            veiculo.id = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);            
        }
    }

    async atualizar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const conexao = await Conectar();
            const sql = "UPDATE veiculo SET nome = ?, placa = ?, ano = ?, marca = ?, cor = ?, categoria = ?, km = ? WHERE id = ?";
            const parametros = [veiculo.nome, veiculo.placa, veiculo.ano, veiculo.marca, veiculo.cor, veiculo.categoria, veiculo.km, veiculo.id];
            await conexao.query(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(veiculo) {
        if (veiculo instanceof Veiculo) {
            const conexao = await Conectar();
            const sql = "DELETE FROM veiculo WHERE id = ?";
            const parametros = [veiculo.id];
            await conexao.query(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(veiculo) {
        let listaVeiculos = [];        
        const conexao = await Conectar();
        const sql = "SELECT * FROM veiculo ORDER BY nome";
        const [rows, fields] = await conexao.query(sql);
        for (const registro of rows) {
            const veiculo = new Veiculo(registro.id, registro.nome, registro.placa, registro.ano, registro.marca, registro.cor, registro.categoria, registro.km);
            listaVeiculos.push(veiculo);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaVeiculos;
    }

}