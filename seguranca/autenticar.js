export default function autenticar(requisicao, resposta, next) {
    const email = 'usuario@email';
    const senha = 'abcde';

    const emailInformado = requisicao.body.email;
    const senhaInformada = requisicao.body.senha;

    if (emailInformado === email && senhaInformada === senha) {
        requisicao.session.autenticado = true;
        resposta.redirect('/cadastro.html');
    }
    else {
        requisicao.session.autenticado = false;
        resposta.redirect('/login.html');
    }
}

export function verificaAutenticacao(requisicao, resposta, next) {
    if (requisicao.session.autenticado) {
        next();
    }
    else {
        resposta.redirect('/login.html');
    }
}