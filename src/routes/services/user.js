import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';

export const loginUser = async (user) => {

    console.log("Dados de Login"+JSON.stringify(user));

    try {
        let res = await axios.post(baseURL+'/login', user, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res
    } catch (error) {
        console.log("ERRO Login: " + error);
        return error.response
    }
}

export const deslogarUser = async () => {
    try {
        const token = sessionStorage.getItem('token');
        console.log("Deslogando com o Token "+token);

        let res = await axios.post(baseURL+'/logout', {}, { headers: { Authorization: `Bearer ${token}`} });
        //let res = await axios.get(host+'/users/'+id, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log("ERRO logout: " + error);
        return error.response
    }
}

export const cadastrarUser = async (user) => {
    console.log("Dados para Cadastro do Usuário"+JSON.stringify(user));

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.post(baseURL+'/usuarios', user, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO CADASTRAR: " + error);
        return error.response
    }
}

export const buscarUser = async (userRegistro) => {
    console.log("Busca de usuário pelo registro "+userRegistro);

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.get(baseURL+'/usuarios/'+userRegistro, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log(" ERRO GET USUARIO: " + error);
        return error.response
    }
}

export const buscarAllUser = async () => {
   

    try {
        console.log("Buscar Todos os Usuários");
        const token = sessionStorage.getItem('token')
        let res = await axios.get(baseURL+'/usuarios', { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log(" ERRO GET USUARIO: " + error);
        return error.response
    }
}

export const AtualizarUser = async (user,userRegistro) => {
    console.log("Usuário que Será atualizado "+JSON.stringify(user));

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.put(baseURL+'/usuarios/'+userRegistro,user, { headers: { Authorization: `Bearer ${token}` }});
        return res
    } catch (error) {
        console.log(" ERRO PUT USUARIO: " + error);
        return error.response
    }
}

export const DeletarUser = async (userRegistro) => {
    console.log("Usuário que será deletado "+userRegistro);

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.delete(baseURL+'/usuarios/'+userRegistro, { headers: { Authorization: `Bearer ${token}`} });
        return res
    } catch (error) {
        console.log(" ERRO GET USUARIO: " + error);
        return error.response
    }
}



