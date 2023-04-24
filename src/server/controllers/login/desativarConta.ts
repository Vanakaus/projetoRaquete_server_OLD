import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';

export interface IDesativa {
    email: string;
    senha: string;
}

export const validacaoDesativa = validacaoYup((getSchema) => ({
    body: getSchema<IDesativa>(yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required().min(6),
    })),
}));

export async function desativaConta(req: Request<{}, {}, IDesativa>, res: Response) {
    
    console.log('\nUsuário desativando conta');
    console.log(`Email: ${req.body.email}`);
    
    pool.query(`SELECT email, senha
            FROM public.usuarios
            WHERE usuarios.email = '${req.body.email}'`, (error: any, results: { rows: any; }) => {
    
        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
            return;
        }

        if(results.rows[0].senha != req.body.senha){
            console.log('\nSenha incorreta');
            res.status(StatusCodes.OK).json({ Resposta: 'Senha incorreta'});
            return;
        }

        pool.query(`UPDATE public.usuarios
            SET tipo_usuario = 'D'
            WHERE usuarios.email = '${req.body.email}' AND usuarios.senha = '${req.body.senha}'`, (error: any, results: { rows: any; }) => {
            if (error) {
                console.log(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
                return;
            }
            console.log('\nConta desativada com sucesso');
            res.status(StatusCodes.OK).json({ Resposta: 'Conta desativada com sucesso'});
    
        }
        );
    }
    );
}