<script>
	import { goto } from '$app/navigation';
	import { deslogarUser } from '../services/user.js';

	const deslogar = async () => {
		var res = await deslogarUser();
		console.log(res.data);
		if (res.status == 200) {
			sessionStorage.removeItem('user');
			sessionStorage.removeItem('token');
			alert(res.data.message);
			setTimeout(() => {
				goto('/');
			}, 500);
		} else if (res.status == 401) {
			sessionStorage.removeItem('user');
			sessionStorage.removeItem('token');
			alert(res.data.message);
			setTimeout(() => {
				goto('/');
			}, 500);
		} else {
			alert('Ocorreu um erro inesperado');
			setTimeout(() => {
				goto('/');
			}, 500);
		}
	};
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
		crossorigin="anonymous"
	/>
</svelte:head>
<body style="margin-left: 45px">
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
		crossorigin="anonymous"
	></script>

	<h1>Página Centralizadora</h1>

	<h2>
		<p id="resultado" />
	</h2>

	<button
		on:click={() => {
			goto('/rotas');
		}}
		type="button"
		>Buscar Rotas</button
	>
	<button
		on:click={() => {
			goto('/user');
		}}
		type="button"
		>Cadastro de usuários</button
	>
	<button
		on:click={() => {
			goto('/segmentos');
		}}
		type="button"
		>Cadastro de Segmentos</button
	>

	<div>
		<button type="button" on:click={() => deslogar()}>Deslogar</button>
	</div>

	<div>
		<a href="/">Voltar</a>
	</div>
</body>
