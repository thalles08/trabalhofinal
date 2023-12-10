import Motorista from "../modelo/motorista.js";
import Conectar from "./conexao.js";

export default class MotoristaDAO {

    async gravar(motorista) {
        if (motorista instanceof Motorista) {
            const conexao = await Conectar();
            const sql = "INSERT INTO motorista (nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria, cnh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const parametros = [motorista.nome, motorista.cpf, motorista.dataNascimento, motorista.email, motorista.telefone, motorista.cep, motorista.endereco, motorista.bairro, motorista.cidade, motorista.categoria, motorista.cnh];
            const resultado = await conexao.query(sql, parametros);
            motorista.id = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);            
        }
    }

    async atualizar(motorista) {
        if (motorista instanceof Motorista) {
            const conexao = await Conectar();
            const sql = "UPDATE motorista SET nome = ?, cpf = ?, dataNascimento = ?, email = ?, telefone = ?, cep = ?, endereco = ?, bairro = ?, cidade = ?, categoria = ?, cnh = ? WHERE id = ?";
            const parametros = [motorista.nome, motorista.cpf, motorista.dataNascimento, motorista.email, motorista.telefone, motorista.cep, motorista.endereco, motorista.bairro, motorista.cidade, motorista.categoria, motorista.cnh, motorista.id];
            await conexao.query(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(motorista) {
        if (motorista instanceof Motorista) {
            const conexao = await Conectar();
            const sql = "DELETE FROM motorista WHERE id = ?";
            const parametros = [motorista.id];
            await conexao.query(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(motorista) {
        let listaMotoristas = [];        
        const conexao = await Conectar();
        const sql = "SELECT * FROM motorista ORDER BY nome";
        const [rows, fields] = await conexao.query(sql);
        for (const registro of rows) {
            const motorista = new Motorista(registro.id, registro.nome, registro.cpf, registro.dataNascimento, registro.email, registro.telefone, registro.cep, registro.endereco, registro.bairro, registro.cidade, registro.categoria, registro.cnh);
            listaMotoristas.push(motorista);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaMotoristas;
    }

}