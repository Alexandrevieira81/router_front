import axios from 'axios';
import { buscarSegmentoID } from './segmentos';
const baseURL = 'http://25.64.61.9:22000';

export const buscarRotas = async (rota) => {

    try {

        const token = sessionStorage.getItem('token')
        console.log("Enviando solicitação de rota para os pontos");
        console.log(rota);

        let res = await axios.post(baseURL + '/rotas', rota, {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });
        return res
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const buscarAllRotas = async () => {

    try {

        console.log("Solicitando todas as Rotas Existentes");
        const token = sessionStorage.getItem('token')

        let res = await axios.get(baseURL + '/Allrotas', {
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
        console.log("Buscando Todos os Segmentos")
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

export const bloquearDesbloquerSegmento = async (segmento) => {

    try {
        console.log("Solicitando bloqueio ou Desbloqueio para a segmento");
        console.log(segmento);
        const token = sessionStorage.getItem('token')

        let res = await axios.put(baseURL +'/bloquearDesbloquerSegmento', segmento, {
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