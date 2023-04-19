import server from './server/server';

server.listen(process.env.SERVER_PORT, () => {

    console.log('\n');
    console.log('= = = = = = = = = = = = = = = = = = = =');
    console.log('Servidor rodando na porta ' + process.env.SERVER_PORT);
    console.log('= = = = = = = = = = = = = = = = = = = =');
});