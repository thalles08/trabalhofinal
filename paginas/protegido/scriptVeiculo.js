const botaoCadastrar = document.getElementById('btCadastrar');
const botaoAtualizar = document.getElementById('btAtualizar');
const botaoExcluir = document.getElementById('btExcluir');
const botaoConfirmar = document.getElementById('btConfirmar');
const botaoCancelar = document.getElementById('btCancelar');

let acao = 'padrao';

mostrarTabelaVeiculo();

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
            incluirVeiculo();
        }
        if (acao === 'atualizar'){
            if (confirm("Tem certeza que deseja alterar os dados do veículo?")){
                atualizarVeiculo();
            }
        }
        if (acao === 'excluir'){
            if (confirm("Tem certeza que deseja excluir o veículo?")){
                excluirVeiculo();
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
    const form = document.getElementById('formVeiculo');
    form.classList.add('was-validated'); // classe bootstrap para exibir o feedback
    if (form.checkValidity()) {
        return true;
    }
    else {
        return false;
    }
}

function limparFormulario(){
    const formVeiculo = document.getElementById('formVeiculo');
    formVeiculo.reset();
    formVeiculo.classList.remove('was-validated');
}

function incluirVeiculo(){

    // pegar as informações que serão preenchidas no formulário e enviá-las para o backend:
    
    const nome = document.getElementById('nome').value;
    const placa = document.getElementById('placa').value;
    const ano = document.getElementById('ano').value;
    const marca = document.getElementById('marca').value;
    const cor = document.getElementById('cor').value;
    const categoria = document.getElementById('categoria').value;
    const km = document.getElementById('km').value;


    // o envio dos dados será feito por meio da api fetch:

    fetch('http://localhost:3000/veiculos', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            placa: placa,
            ano: ano,
            marca: marca,
            cor: cor,
            categoria: categoria,
            km: km
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem + "Veiculo cadastrado com o ID: " + dados.id_veiculo);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaVeiculo();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao cadastrar veiculo: ' + erro.message);
    })
}

function atualizarVeiculo(){

    // pegar as informações que serão preenchidas no formulário e enviá-las para o backend:

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const placa = document.getElementById('placa').value;
    const ano = document.getElementById('ano').value;
    const marca = document.getElementById('marca').value;
    const cor = document.getElementById('cor').value;
    const categoria = document.getElementById('categoria').value;
    const km = document.getElementById('km').value;

    // o envio dos dados será feito por meio da api fetch:

    fetch('http://localhost:3000/veiculos', {
        method: 'PUT' || 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            placa: placa,
            ano: ano,
            marca: marca,
            cor: cor,
            categoria: categoria,
            km: km
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaVeiculo();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao atualizar veículo: ' + erro.message);
    })
}

function excluirVeiculo(){
    id = document.getElementById('id').value;

    fetch('http://localhost:3000/veiculos', {
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
            mostrarTabelaVeiculo();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao excluir veiculo: ' + erro.message);
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

function mostrarTabelaVeiculo(){
    fetch('http://localhost:3000/veiculos', {method: 'GET'})
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
                                        <th>Placa</th>
                                        <th>Ano de fabricação</th>
                                        <th>Marca</th>
                                        <th>Cor</th>
                                        <th>Categoria</th>
                                        <th>Km atual</th>
                                        <th>Ações</th>
                                       </tr>`
                tabela.appendChild(cabecalho);
                for (const veiculo of dados){
                    let linhaTabela = document.createElement('tr');
                    linhaTabela.innerHTML = `<td>${veiculo.id}</td>
                                             <td>${veiculo.nome}</td>
                                             <td>${veiculo.placa}</td>
                                             <td>${veiculo.ano}</td>
                                             <td>${veiculo.marca}</td>
                                             <td>${veiculo.cor}</td>
                                             <td>${veiculo.categoria}</td>
                                             <td>${veiculo.km}</td>
                                             <td><button class="btn btn-light btn-sm" onClick = "selecionarVeiculo('${veiculo.id}', '${veiculo.nome}', '${veiculo.placa}', 
                                                '${veiculo.ano}', '${veiculo.marca}', '${veiculo.cor}', '${veiculo.categoria}', '${veiculo.km}')">
                                                 Selecionar
                                                 </button>
                                             </td>`;
                    corpo.appendChild(linhaTabela);
                }
                tabela.appendChild(corpo);
                divTabela.appendChild(tabela);
            }
            else {
                mostraMensagem('Não há veículos cadastrados.');
            }
        }
        else {
            mostraMensagem(dados.mensagem)
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao enviar a requisição: ' + erro.message);
    })
}

function selecionarVeiculo(id, nome, placa, ano, marca, cor, categoria, km){
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('placa').value = placa;
    document.getElementById('ano').value = ano;
    document.getElementById('marca').value = marca;
    document.getElementById('cor').value = cor;
    document.getElementById('categoria').value = categoria;
    document.getElementById('km').value = km;

    document.getElementById('btCadastrar').disabled = true;
}