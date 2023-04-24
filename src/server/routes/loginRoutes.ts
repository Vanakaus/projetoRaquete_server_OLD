import { Router } from 'express';

import { LoginController } from '../controllers';
import { informativo } from '../shared/middlewares';

export const router = Router();



router.post('/login', informativo, LoginController.validacaoLogin, LoginController.login);
router.post('/cadastro', informativo, LoginController.validacaoCadastro, LoginController.cadastro);
router.post('/atualizarDados', informativo, LoginController.validacaoAtualiza, LoginController.atualiza);
router.post('/atualizarSenha', informativo, LoginController.validacaoAtualizaSenha, LoginController.atualizaSenha);


// router.get('/recuperarSenha', LoginController);

