import { Router } from 'express';

import { LoginController } from '../controllers';

export const router = Router();



router.post('/login', LoginController.login);


// router.get('/cadastro', LoginController);
// router.get('/recuperarSenha', LoginController);

