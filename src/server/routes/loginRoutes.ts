import { Router } from 'express';

import { LoginController } from '../controllers';

export const router = Router();


router.get('/', (_, res) => {

    console.log('Servidor Projeto Raquete rodando!');

});


router.get('/login', LoginController.login);


// router.get('/cadastro', LoginController);
// router.get('/recuperarSenha', LoginController);

