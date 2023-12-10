const botaoCadastrar = document.getElementById('btCadastrar');
const botaoAtualizar = document.getElementById('btAtualizar');
const botaoExcluir = document.getElementById('btExcluir');
const botaoConfirmar = document.getElementById('btConfirmar');
const botaoCancelar = document.getElementById('btCancelar');

let acao = 'padrao';

mostrarTabelaMotorista();

botaoCadastrar.onclick = () => {
    acao = 'cadastrar';
    habilitarBotoes();
};

botaoAtualizar.onclick = () => {
    acao = 'atualizar';
    habilitarBotoes();
};

botaoExcluir.onclick = () => {
    acao = 'excluir';
    habilitarBotoes();
};

botaoConfirmar.onclick = () => {
    if (validarDados()){
        if (acao === 'cadastrar'){
            incluirMotorista();
        }
        if (acao === 'atualizar'){
            if (confirm("Tem certeza que deseja alterar os dados do motorista?")){
                atualizarMotorista();
            }
        }
        if (acao === 'excluir'){
            if (confirm("Tem certeza que deseja excluir o motorista?")){
                excluirMotorista();
            }
        }
    }    
};

botaoCancelar.onclick = () => {
    limparFormulario();
    acao = 'padrao';
    habilitarBotoes();
};

function habilitarBotoes(){

    if (acao === 'cadastrar' || acao === 'atualizar' || acao === 'excluir'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
        botaoConfirmar.disabled = false;
        botaoCancelar.disabled = false;
    } 
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = false;
        botaoConfirmar.disabled = true;
        botaoCancelar.disabled = true;
    }
}

function validarDados(){
    const form = document.getElementById('formMotorista');
    form.classList.add('was-validated'); // classe bootstrap para exibir o feedback
    if (form.checkValidity()) {
        return true;
    }
    else {
        return false;
    }
}

function limparFormulario(){
    const formMotorista = document.getElementById('formMotorista');
    formMotorista.reset();
    formMotorista.classList.remove('was-validated');
}

function incluirMotorista(){

    // pegar as informações que serão preenchidas no formulário e enviá-las para o backend:
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const categoria = document.getElementById('categoria').value;
    const cnh = document.getElementById('cnh').value;

    // o envio dos dados será feito por meio da api fetch:

    fetch('http://localhost:3000/motoristas', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            email: email,
            telefone: telefone,
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            categoria: categoria,
            cnh: cnh
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem + "Motorista cadastrado com o ID: " + dados.id_motorista);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaMotorista();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao cadastrar motorista: ' + erro.message);
    })
}

function atualizarMotorista(){

    // pegar as informações que serão preenchidas no formulário e enviá-las para o backend:

    const id = document.getElementById('id').value;
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const categoria = document.getElementById('categoria').value;
    const cnh = document.getElementById('cnh').value;

    // o envio dos dados será feito por meio da api fetch:

    fetch('http://localhost:3000/motoristas', {
        method: 'PUT' || 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: id,
            cpf: cpf,
            nome: nome,
            dataNascimento: dataNascimento,
            email: email,
            telefone: telefone,
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            categoria: categoria,
            cnh: cnh
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaMotorista();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao atualizar motorista: ' + erro.message);
    })
}

function excluirMotorista(){
    id = document.getElementById('id').value;

    fetch('http://localhost:3000/motoristas', {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaMotorista();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao excluir motorista: ' + erro.message);
    })
}

function mostraMensagem(msg){
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `
        <div class="alert alert-info" role="alert">
        ${msg}
        </div>`;
    setTimeout(() => {
        divMensagem.innerHTML = ''
    }, 8000);

}

function mostrarTabelaMotorista(){
    fetch('http://localhost:3000/motoristas', {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (Array.isArray(dados)){
            if (dados.length > 0){
                let divTabela = document.getElementById('tabela');
                divTabela.innerHTML = '';
                let tabela = document.createElement('table');
                tabela.classList.add('table', 'table-striped', 'table-hover');
                let cabecalho = document.createElement('thead');
                let corpo = document.createElement('tbody');
                cabecalho.innerHTML = `<tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Data de Nascimento</th>
                                        <th>e-mail</th>
                                        <th>Telefone</th>
                                        <th>CEP</th>
                                        <th>Endereço</th>
                                        <th>Bairro</th>
                                        <th>Cidade</th>
                                        <th>Categoria da CNH</th>
                                        <th>CNH</th>
                                        <th>Ações</th>
                                       </tr>`
                tabela.appendChild(cabecalho);
                for (const motorista of dados){
                    let linhaTabela = document.createElement('tr');
                    linhaTabela.innerHTML = `<td>${motorista.id}</td>
                                             <td>${motorista.nome}</td>
                                             <td>${motorista.cpf}</td>
                                             <td>${motorista.dataNascimento}</td>
                                             <td>${motorista.email}</td>
                                             <td>${motorista.telefone}</td>
                                             <td>${motorista.cep}</td>
                                             <td>${motorista.endereco}</td>
                                             <td>${motorista.bairro}</td>
                                             <td>${motorista.cidade}</td>
                                             <td>${motorista.categoria}</td>
                                             <td>${motorista.cnh}</td>
                                             <td><button class="btn btn-light btn-sm" onClick = "selecionarMotorista('${motorista.id}', '${motorista.nome}', '${motorista.cpf}', 
                                                '${motorista.dataNascimento}', '${motorista.email}', '${motorista.telefone}', '${motorista.cep}', '${motorista.endereco}', '${motorista.bairro}', '${motorista.cidade}', '${motorista.categoria}', '${motorista.cnh}')">
                                                 Selecionar
                                                 </button>
                                             </td>`;
                    corpo.appendChild(linhaTabela);
                }
                tabela.appendChild(corpo);
                divTabela.appendChild(tabela);
            }
            else {
                mostraMensagem('Não há motoristas cadastrados.');
            }
        }
        else {
            mostraMensagem(dados.mensagem)
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao enviar a requisição: ' + erro.message);
    })
}

function selecionarMotorista(id, nome, cpf, dataNascimento, email, telefone, cep, endereco, bairro, cidade, categoria, cnh){
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cpf').value = cpf;
    document.getElementById('dataNascimento').value = dataNascimento;
    document.getElementById('email').value = email;
    document.getElementById('telefone').value = telefone;
    document.getElementById('cep').value = cep;
    document.getElementById('endereco').value = endereco;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;
    document.getElementById('categoria').value = categoria;
    document.getElementById('cnh').value = cnh;

    document.getElementById('btCadastrar').disabled = true;
}