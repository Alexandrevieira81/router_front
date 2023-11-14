<script>
	import { goto } from '$app/navigation';
	import { deslogarUser } from '../services/user.js';

	const deslogar = async () => {
		var res = await deslogarUser();
		console.log(res.data);
		if (res.status == 200) {
			sessionStorage.removeItem('user');
			sessionStorage.removeItem('token');
			document.getElementById('resultado').innerHTML = 'Deslogado Com Sucesso';
			setTimeout(() => {
				goto('/');
			}, 2000);
		} else {
			sessionStorage.removeItem('user');
			sessionStorage.removeItem('token');
			document.getElementById('resultado').innerHTML = 'Usuário não Autenticado';
			setTimeout(() => {
				goto('/');
			}, 2000);
		}
	};
</script>

<h1>Página Centralizadora</h1>

<h2>
	<p id="resultado" />
</h2>

<button
	on:click={() => {
		goto('/rotas');
	}}
	type="button"
	class="btn text-white nav-link">Buscar Rotas</button
>
<button
	on:click={() => {
		goto('/user');
	}}
	type="button"
	class="btn text-white nav-link">Cadastro de usuários</button
>
<button
	on:click={() => {
		goto('/segmentos');
	}}
	type="button"
	class="btn text-white nav-link">Cadastro de Segmentos</button
>

<div>
	<button class="button" on:click={() => deslogar()}>Deslogar</button>
</div>

<div>
	<a href="/">Voltar</a>
</div>
