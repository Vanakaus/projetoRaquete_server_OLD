import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';


export interface ILogin {
    email: string;
    senha: string;
}

export const validacaoLogin = validacaoYup((getSchema) => ({
    body: getSchema<ILogin>(yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required().min(6),
    })),
}));


export async function login(req: Request<{}, {}, ILogin>, res: Response) {

    console.log('\nUsuário tentando logar');
    console.log(`Email: ${req.body.email}`);

    
    pool.query(`SELECT email, nome, tipo_usuario
        FROM public.usuarios
        WHERE usuarios.email = '${req.body.email}' AND usuarios.senha = '${req.body.senha}'`, (error: any, results: { rows: any; }) => {
        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor', JWT: '' });
        }
        if (results.rows.length === 0) {
            console.log('\nEmail ou senha incorretos');
            res.status(StatusCodes.OK).json({ Resposta: 'Email ou senha incorretos', nome:'', JWT: '' });
        }
        
        if (results.rows.length === 1) {
            console.log(`\nUsuario ${results.rows[0].nome} logado com sucesso`);
            res.status(StatusCodes.OK).json({ Resposta: 'Login realizado com sucesso', nome:results.rows[0].nome, JWT: 'token123' });
        }
    }  
    );

}