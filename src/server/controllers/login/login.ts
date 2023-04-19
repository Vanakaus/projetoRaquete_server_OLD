import { StatusCodes } from 'http-status-codes';
import {Request, Response } from 'express';
import * as yup from 'yup';


export interface ILogin {
    email: string;
    senha: string;
}

const loginValidacao: yup.ObjectSchema<ILogin> = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required().min(6),
});

export async function login(req: Request<{}, {}, ILogin>, res: Response) {

    console.log('\n');
    console.log('POST /login');

    let login: ILogin | undefined = undefined;
    
    try {
        login = await loginValidacao.validateSync(req.body, {abortEarly: false});
    } catch (error) {

        console.log('\nErro de validação');

        const validacaoError = error as yup.ValidationError;
        const erros: Record<string, string> = {};

        
        validacaoError.inner.forEach(erro => {
            console.log(`Campo ${erro.path}: ${erro.message}`);

            if (erro.path)
                erros[erro.path] = erro.message;
        });


        return res.status(StatusCodes.BAD_REQUEST).json({ erros });
    }




    // res.status(StatusCodes.BAD_REQUEST);
    // res.json({ Resposta: 'Dados inválidos', JWT: '' });
    // console.log('\nDados inválidos');
    // return;

    console.log('\nUsuário tentando logar');
    console.log(`Email: ${req.body.email}`);



    
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