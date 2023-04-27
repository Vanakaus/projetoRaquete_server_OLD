import {Request, Response } from 'express';
import * as yup from 'yup';

import { validacaoYup } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';
import { hashSenha } from '../../shared/services';


export interface ICadastro {
    email: string;
    senha: string;
    cpf: number;
    nome: string;
    sobrenome: string;
    nascimento: string;
    celular?: string;
    telefone?: string;
}

export const validacaoCadastro = validacaoYup((getSchema) => ({
    body: getSchema<ICadastro>(yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required().min(6),
        cpf: yup.number().required().min(11),
        nome: yup.string().required(),
        sobrenome: yup.string().required(),
        nascimento: yup.string().required(),
        celular: yup.string().optional(),
        telefone: yup.string().optional(),
    })),
}));

export async function cadastro(req: Request<{}, {}, ICadastro>, res: Response) {



    console.log('\nUsuário se Cadastrando');
    console.log(`Nome: ${req.body.nome}`);
    console.log(`Email: ${req.body.email}`);

    
    pool.query(`SELECT email, cpf
        FROM public.usuarios
        WHERE usuarios.email = '${req.body.email}' OR usuarios.cpf = '${req.body.cpf}'`, async (error: any, results: { rows: any; }) => {
        if (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
        }
        if (results.rows.length >= 1) {
            console.log('\nEmail e/ou CPF já existente');
            res.status(StatusCodes.OK).json({ Resposta: 'Email e/ou CPF já existente' });
        }


        if (results.rows.length === 0) {
            console.log('\nEmail e CPF Disponíveis');


            const senhaEncriptada = await hashSenha(req.body.senha);

            pool.query(`INSERT INTO public.usuarios(
                email, senha, cpf, nome, sobrenome,
                nascimento, celular, telefone)
                VALUES (
                    '${req.body.email}', '${senhaEncriptada}',
                    '${req.body.cpf}', '${req.body.nome}', '${req.body.sobrenome}',
                    '${req.body.nascimento}', '${req.body.celular}', '${req.body.telefone}');`, (error: any, results: { rows: any; }) => {
                
                if (error) {
                    console.log(error);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Resposta: 'Erro no servidor'});
                    return;
                }

                console.log(`\nUsuario ${req.body.nome} cadastrado com sucesso`);
                res.status(StatusCodes.OK).json({ Resposta: 'Cadastro realizado com sucesso' });

            });
        }
    }  
    );
}