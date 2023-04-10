import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export const router = Router();

router.get('/teste', (req, res) => {

    console.log(req.body.teste);

    res.status(StatusCodes.OK);
    res.json({ Resposta: req.body.teste ? req.body.teste : 'Sem resposta' });
});