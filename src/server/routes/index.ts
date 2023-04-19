import { Router } from 'express';

export const router = Router();


router.get('/', (_, res) => {

    console.log('\n');
    console.log('get /');


    console.log('\nServidor Projeto Raquete rodando!');
    res.send('Servidor Projeto Raquete rodando!');

});