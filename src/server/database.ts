/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';


const Pool = require('pg').Pool;
export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.BD_PORT,
});