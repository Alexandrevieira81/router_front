import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';


export const cadastrarPonto = async (ponto) => {
    

    try {
        console.log('Dados Enviados Para CADASTRAR o Ponto');
        console.log(ponto);
        const token = sessionStorage.getItem('token')
        let res = await axios.post(baseURL + '/pontos', ponto, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO CADASTRAR PONTO: " + error);
        return error.response
    }
}

export const buscarPontos = async () => {

    try {
        console.log("Carregando Todos os Pontos")
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL + '/pontos', {
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


    try {

        console.log('Dados Enviados Para EDITAR o Ponto');
        console.log(ponto);
        const token = sessionStorage.getItem('token')
        let res = await axios.put(baseURL + '/pontos/' + ponto.id, ponto, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO ATUALIZAR PONTO: " + error);
        return error.response
    }
}

export const deletarPonto = async (id) => {
    

    try {
        console.log("Deletendo o ID");
        console.log(id);
        const token = sessionStorage.getItem('token')
        let res = await axios.delete(baseURL + '/pontos/' + id, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log(" ERRO AO DELETAR UM PONTO: " + error);
        return error.response
    }
}
export const buscarPontoID = async (id) => {

    try {
        console.log("Buscando pontos Pelo "+id)
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL + '/pontos/' + id, {
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