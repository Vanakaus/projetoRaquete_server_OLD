import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';
import { hashSenha, verifcaSenha } from '../../shared/services';

export interface IAtualizaSenha {
    email: string;
    senha: string;
    novaSenha: string;
}


export const validacaoAtualizaSenha = validacaoYup((getSchema) => ({
    body: getSchema<IAtualizaSenha>(yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required().min(6),
        novaSenha: yup.string().required().min(6),
    })),
}));

export async function atualizaSenha(req: Request<{}, {}, IAtualizaSenha>, res: Response) {

    console.log('\nUsuário atualizando senha');
    console.log(`Email: ${req.body.email}`);

    pool.query(`SELECT email, senha
        FROM public.usuarios
        WHERE usuarios.email = '${req.body.email}'`, async (error: any, results: { rows: any; }) => {

        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
            return;
        }


        if( !(await verifcaSenha( req.body.senha, results.rows[0].senha)) ){
            console.log('\nSenha incorreta');
            res.status(StatusCodes.OK).json({ Resposta: 'Senha incorreta'});
            return;
        }

        
        pool.query(`UPDATE public.usuarios 
        SET senha='${ await hashSenha(req.body.novaSenha) }'
        WHERE usuarios.email = '${req.body.email}'`, (error: any, results: { rows: any; }) => {
            if (error) {
                console.log(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
                return;
            }
            console.log('\nSenha Atualizada com sucesso');
            res.status(StatusCodes.OK).json({ Resposta: 'Senha Atualizada com sucesso'});

        }
        );

    }

    );

}
