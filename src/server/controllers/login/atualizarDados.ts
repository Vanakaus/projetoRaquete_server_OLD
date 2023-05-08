import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';


export interface IAtualiza {
    email: string;
    novoEmail: string;
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

    pool.query(`SELECT * FROM public.usuarios WHERE usuarios.email = '${req.body.email}'`, (error: any, results: { rows: any; }) => {
        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
            return;
        }

        if (results.rows.length === 0) {
            console.log('\nUsuário não encontrado');
            res.status(StatusCodes.NOT_FOUND).json({ Resposta: 'Usuário não encontrado' });
            return;
        }

        if (req.body.email !== req.body.novoEmail) {
            pool.query(`SELECT * FROM public.usuarios WHERE usuarios.email = '${req.body.novoEmail}'`, (error: any, results: { rows: any; }) => {
                if (error) {
                    console.log(error);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
                    return;
                }
    
                if (results.rows.length !== 0) {
                    console.log('\nEmail já cadastrado');
                    res.status(StatusCodes.CONFLICT).json({ Resposta: 'Email já cadastrado' });
                    return;
                }
            });
        }

        pool.query(`UPDATE public.usuarios
                    SET email='${req.body.novoEmail}',
                    nome='${req.body.nome}', sobrenome='${req.body.sobrenome}',
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
    });
}