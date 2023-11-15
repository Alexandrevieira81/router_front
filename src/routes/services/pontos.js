import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';


export const cadastrarPonto = async (ponto) => {
    console.log(ponto);

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.post(baseURL+'/pontos',ponto, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO CADASTRAR PONTO: " + error);
        return error.response
    }
}

export const buscarPontos = async () => {

    try {
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL+'/pontos',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const atualizarPonto = async (ponto) => {
    console.log("entrou na função atualizar ponto "+ponto.id);

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.put(baseURL+'/pontos', ponto, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO ATUALIZAR PONTO: " + error);
        return error.response
    }
}

export const deletarPonto= async (id) => {
    console.log(id);

    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.delete(baseURL+'/pontos/'+id, { headers: { Authorization: `Bearer ${token}`} });
        return res
    } catch (error) {
        console.log(" ERRO AO DELETAR UM PONTO: " + error);
        return error.response
    }
}