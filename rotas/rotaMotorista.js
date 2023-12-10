import { Router } from "express";
import MotoristaCtrl from "../controle/MotoristaCtrl.js";

const rotaMotorista = new Router();
const motCtrl = new MotoristaCtrl();

rotaMotorista.get('/', motCtrl.consultar)
.post('/', motCtrl.gravar)
.put('/', motCtrl.atualizar)
.patch('/', motCtrl.atualizar)
.delete('/', motCtrl.excluir);

export default rotaMotorista;