import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';


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
    console.log(`Email: ${req.body.email}`);

    
    pool.query(`SELECT email, nome, tipousuario
        FROM public.login
        JOIN public.usuarios
        ON email = login
        WHERE login.email = '${req.body.email}' AND login.senha = '${req.body.senha}'`, (error: any, results: { rows: any; }) => {
        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor', JWT: '' });
        }
        if (results.rows.length === 0) {
            console.log('Email ou senha incorretos');
            res.status(StatusCodes.OK).json({ Resposta: 'Email ou senha incorretos', JWT: '' });
        }
        
        if (results.rows.length === 1) {
            console.log('Login realizado com sucesso');
            res.status(StatusCodes.OK).json({ Resposta: 'Login realizado com sucesso', JWT: 'token123' });
        }
    }  
    );

}