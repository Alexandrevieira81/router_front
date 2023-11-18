import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';


export const cadastrarSegmento = async (segmento) => {

    try {
        console.log("Cadastrando Dados de Segmento ");
        console.log(segmento);
        const token = sessionStorage.getItem('token')
        let res = await axios.post(baseURL + '/segmentos', segmento, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO CADASTRAR SEGMENTO: " + error);
        return error.response
    }
}

export const atualizarSegmento = async (segmento) => {

    try {
        console.log("Atualizando Dados de Segmento ");
        console.log(segmento);
        const token = sessionStorage.getItem('token')
        let res = await axios.put(baseURL + '/segmentos', segmento, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log("ERRO AO ATUALIZAR SEGMENTO: " + error);
        return error.response
    }
}

export const deletarSegmento = async (id) => {
    

    try {
        console.log("Deletendo o Registro "+id);
        const token = sessionStorage.getItem('token')
        let res = await axios.delete(baseURL + '/segmentos/' + id, { headers: { Authorization: `Bearer ${token}` } });
        return res
    } catch (error) {
        console.log(" ERRO AO DELETAR UM SEGMENTO: " + error);
        return error.response
    }
}
export const buscarSegmentos = async () => {

    try {
        console.log("Buscando todos os Segmentos");
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL + '/segmentos', {
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
export const buscarSegmentoID = async (id) => {

    try {
        console.log("Buscando todos os Segmento com o código "+id);
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL + '/segmentos/' + id, {
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


