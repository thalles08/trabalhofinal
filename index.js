import express from "express";
import session from 'express-session';
import autenticar, {verificaAutenticacao} from './seguranca/autenticar.js';
import rotaMotorista from "./rotas/rotaMotorista.js";
import rotaVeiculo from "./rotas/rotaVeiculo.js"

const host = "0.0.0.0";
const porta = 3000;

const app = express();

app.use(session({
    secret: '4c3ss0',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 10}
}));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get('/', (requisicao, resposta) => {
    resposta.redirect('/login.html');
});

app.get('/login', (requisicao, resposta) => {
    resposta.redirect('/login.html');
});

app.post('/login', autenticar);

app.use(express.static('./paginas/publico'));
app.use(verificaAutenticacao, express.static('./paginas/protegido'));

app.use('/motoristas', rotaMotorista);
app.use('/veiculos', rotaVeiculo);

app.listen(porta, host, () => {
    console.log(`Servidor esperando por requisições em http://${host}:${porta}`)
});
