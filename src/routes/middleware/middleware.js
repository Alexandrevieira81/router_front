import { goto } from '$app/navigation';
export const limparSessao = async () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    document.getElementById('resultado').innerHTML =
        'Usuário não Autenticado, Você Será Redirecionado para o Login';
    setTimeout(() => {
        goto('/');
    }, 2000);
};