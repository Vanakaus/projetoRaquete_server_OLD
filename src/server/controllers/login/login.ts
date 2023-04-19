import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';


export interface ILogin {
    email: string;
    senha: string;
}

export const validacao = validacaoYup((getSchema) => ({
    body: getSchema<ILogin>(yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required().min(6),
    })),
}));


export async function login(req: Request<{}, {}, ILogin>, res: Response) {

    console.log('\nUsuário tentando logar');
    console.log(`Email: ${req.body}`);

    
    //Ajustar depois

    if (req.body.email === 'vini@gmail.com' && req.body.senha === 'vini123') {
        res.status(StatusCodes.OK);
        res.json({ Resposta: 'Login realizado com sucesso', JWT: 'token123' });
        console.log('\nUsuário logado com sucesso');
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        res.json({ Resposta: 'Login ou senha incorretos', JWT: '' });
        console.log('\nUsuário não logado');
    }

}