import Veiculo from "../modelo/veiculo.js";

export default class VeiculoCtrl {
    
    // Método POST do HTTP
    gravar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'POST'){
            const dados = requisicao.body;

            const nome = dados.nome;
            const placa = dados.placa;
            const ano = dados.ano;
            const marca = dados.marca;
            const cor = dados.cor;
            const categoria = dados.categoria;
            const km = dados.km;

            if (nome && placa && ano && marca && cor && categoria && km){
                const veiculo = new Veiculo(0, nome, placa, ano, marca, cor, categoria, km);
                veiculo.gravar().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Veículo cadastrado com sucesso!",
                        id_veiculo: veiculo.id
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível registrar o veículo: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Os campos nome, placa, ano, marca, cor, categoria, km são obrigatórios!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para registrar um veículo, utilize o método POST."
            });
        }
    }

    // Método PUT OU PATCH do HTTP
    atualizar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'PUT' || requisicao.method === "PATCH"){
            const dados = requisicao.body;

            const id = dados.id;
            const nome = dados.nome;
            const placa = dados.placa;
            const ano = dados.ano;
            const marca = dados.marca;
            const cor = dados.cor;
            const categoria = dados.categoria;
            const km = dados.km;

            if (id && nome && placa && ano && marca && cor && categoria && km){
                const veiculo = new Veiculo(id, nome, placa, ano, marca, cor, categoria, km);
                veiculo.atualizar().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Veículo atualizado com sucesso!",
                        id_veiculo: veiculo.id
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar o veículo: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Os campos nome, placa, ano, marca, cor, categoria, km são obrigatórios!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para atualizar um veículo, utilize o método PUT ou PATCH."
            });
        }
    }

    // Método DELETE do HTTP
    excluir(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'DELETE'){
            const dados = requisicao.body;

            const id = dados.id;
            
            if (id){
                const veiculo = new Veiculo(id);
                veiculo.excluir().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Veículo excluído com sucesso!",                        
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir o veículo: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "O campo id é obrigatório!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para excluir um veículo, utilize o método DELETE."
            });
        }
    }

    // Método GET do HTTP
    consultar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'GET'){
            const veiculo = new Veiculo(0);
            veiculo.consultar().then((listaVeiculos)=>{
                resposta.json(listaVeiculos);
            }).catch((erro)=>{
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter o veículo: " + erro.message
                });
            });
        }        
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para consultar um veículo, utilize o método GET."
            });
        }
    }
}