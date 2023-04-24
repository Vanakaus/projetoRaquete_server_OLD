import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';


export interface IAtualiza {
    email: string;
    novoEmail: string;
    tipoUsuario: string;
    cpf: number;
    nome: string;
    sobrenome: string;
    nascimento: string;
    foto?: string;
    celular?: string;
    telefone?: string;
}

export const validacaoAtualiza = validacaoYup((getSchema) => ({
    body: getSchema<IAtualiza>(yup.object().shape({
        email: yup.string().email().required(),
        novoEmail: yup.string().email().required(),
        tipoUsuario: yup.string().required().max(1),
        cpf: yup.number().required().min(11),
        nome: yup.string().required(),
        sobrenome: yup.string().required(),
        nascimento: yup.string().required(),
        foto: yup.string().optional(),
        celular: yup.string().optional(),
        telefone: yup.string().optional(),
    })),
}));

export async function atualiza(req: Request<{}, {}, IAtualiza>, res: Response) {

    


    console.log('\nUsuário Atualizando Dados');
    console.log(`Nome: ${req.body.nome}`);
    console.log(`Email: ${req.body.email}`);

    pool.query(`UPDATE public.usuarios
        SET email='${req.body.novoEmail}', tipo_usuario='${req.body.tipoUsuario}',
        cpf='${req.body.cpf}', nome='${req.body.nome}', sobrenome='${req.body.sobrenome}',
        nascimento='${req.body.nascimento}', foto='${req.body.foto}',
        celular='${req.body.celular}', telefone='${req.body.telefone}'
        WHERE usuarios.email = '${req.body.email}'`, (error: any, results: { rows: any; }) => {
        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
            return;
        }

        console.log('\nDados Atualizados');
        res.status(StatusCodes.OK).json({ Resposta: 'Dados Atualizados' });

    });

}