import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';

export const buscarRotas = async (rota) => {

    try {

        const token = sessionStorage.getItem('token')

        
        let res = await axios.post(baseURL+'/rotas',rota, {
            headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`}
        });
        return res
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const buscarAllRotas = async () => {

    try {
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL+'/rotas',{
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

export const buscarAllSegmentos = async () => {

    try {
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL+'/segmentos',{
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