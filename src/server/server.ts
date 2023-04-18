import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { router } from './routes/loginRoutes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);


export default server;