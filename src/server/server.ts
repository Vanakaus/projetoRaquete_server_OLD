import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './shared/services/traducoesYup';
import { router as routers} from './routes/index';
import { router as loginRouter} from './routes/loginRoutes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(routers);
server.use(loginRouter);


export default server;