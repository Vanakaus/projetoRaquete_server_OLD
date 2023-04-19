import e, { NextFunction } from 'express';


export function informativo(req: e.Request, res: e.Response, next: NextFunction) {

    console.log('\n');
    console.log(`Acao: ${req.method}`);
    console.log(`Rota: ${req.url}`);

    console.log(`\nheaders: \n${req.rawHeaders}`);

    console.log(`\nbody: \n${JSON.stringify(req.body)}`);

    return next();
}

