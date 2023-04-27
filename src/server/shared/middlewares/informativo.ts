import e, { NextFunction } from 'express';


export function informativo(req: e.Request, res: e.Response, next: NextFunction) {

    console.log('\n');
    console.log(`Acao: ${req.method}`);
    console.log(`Rota: ${req.url}`);

    const body = JSON.stringify(req.body).replace(/"senha":"[^"]*"/g, '"senha":"******"').replace(/"novaSenha":"[^"]*"/g, '"novaSenha":"******"');
    
    console.log(`\nheaders: \n${req.rawHeaders}`);
    console.log(`\nbody: \n${body}`);

    return next();
}

