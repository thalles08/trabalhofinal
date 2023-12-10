import { Router } from "express";
import VeiculoCtrl from "../controle/VeiculoCtrl.js";

const rotaVeiculo = new Router();
const veicCtrl = new VeiculoCtrl();

rotaVeiculo.get('/', veicCtrl.consultar)
.post('/', veicCtrl.gravar)
.put('/', veicCtrl.atualizar)
.patch('/', veicCtrl.atualizar)
.delete('/', veicCtrl.excluir);

export default rotaVeiculo;