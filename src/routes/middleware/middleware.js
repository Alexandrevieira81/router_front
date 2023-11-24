import { goto } from '$app/navigation';
export const limparSessao = async () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setTimeout(() => {
        goto('/');
    }, 500);
};