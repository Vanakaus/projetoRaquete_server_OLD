import { StatusCodes } from 'http-status-codes';
import {Request, Response } from 'express';


export function login(req: Request, res: Response) {

    console.log(`Usuário ${req.body.email} tentando logar`);


    
    //Ajustar depois

    if (req.body.email === 'vini@gmail.com' && req.body.password === 'vini123') {
        res.status(StatusCodes.OK);
        res.json({ Resposta: 'Login realizado com sucesso', JWT: 'token123' });
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        res.json({ Resposta: 'Login ou senha incorretos', JWT: '' });
    }

}