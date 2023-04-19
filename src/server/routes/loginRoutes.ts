import { Router } from 'express';

import { LoginController } from '../controllers';
import { informativo } from '../shared/middlewares';

export const router = Router();



router.post('/login', informativo, LoginController.validacao, LoginController.login);


// router.get('/cadastro', LoginController);
// router.get('/recuperarSenha', LoginController);

