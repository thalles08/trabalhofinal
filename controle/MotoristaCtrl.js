import Motorista from "../modelo/motorista.js";

export default class MotoristaCtrl {
    
    // Método POST do HTTP
    gravar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'POST'){
            const dados = requisicao.body;

            const nome = dados.nome;
            const cpf = dados.cpf;
            const dataNascimento = dados.dataNascimento;
            const email = dados.email;
            const telefone = dados.telefone;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const categoria = dados.categoria;
            const cnh = dados.cnh;

            if (nome && cpf && dataNascimento && email && telefone && cep && endereco && bairro && cidade && categoria && cnh){
                const motorista = new Motorista(0, nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria, cnh);
                motorista.gravar().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Motorista gravado com sucesso! ",
                        id_motorista: motorista.id
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível registrar o motorista: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Os campos nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria e cnh são obrigatórios!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para gravar um motorista, utilize o método POST."
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
            const cpf = dados.cpf;
            const dataNascimento = dados.dataNascimento;
            const email = dados.email;
            const telefone = dados.telefone;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const categoria = dados.categoria;
            const cnh = dados.cnh;

            if (id && nome && cpf && dataNascimento && email && telefone && cep && endereco && bairro && cidade && categoria && cnh){
                const motorista = new Motorista(id, nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria, cnh);
                motorista.atualizar().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Motorista atualizado com sucesso! ",
                        id_motorista: motorista.id
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar o motorista: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Os campos id, nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria e cnh são obrigatórios!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para atualizar um motorista, utilize o método PUT ou PATCH."
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
                const motorista = new Motorista(id);
                motorista.excluir().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Motorista excluído com sucesso!",                        
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir o motorista: " + erro.message
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
                mensagem: "Metodo HTTP inválido! Para excluir um motorista, utilize o método DELETE."
            });
        }
    }

    // Método GET do HTTP
    consultar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'GET'){
            const motorista = new Motorista(0);
            motorista.consultar().then((listaMotoristas)=>{
                resposta.json(listaMotoristas);
            }).catch((erro)=>{
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter o motorista: " + erro.message
                });
            });
        }        
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para consultar um motorista, utilize o método GET."
            });
        }
    }
}