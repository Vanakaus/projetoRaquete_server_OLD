import * as cadastro from './cadastro';
import * as login from './login';
import * as atualiza from './atualizarDados';
import * as atualizaSenha from './atualizarSenha';
// import * as recuperarSenha from './recuperarSenha';


export const LoginController = {
    ...login,
    ...cadastro,
    ...atualiza,
    ...atualizaSenha,
};