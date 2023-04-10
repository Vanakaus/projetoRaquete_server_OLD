import server from './server/server';

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ' + process.env.PORT);
});