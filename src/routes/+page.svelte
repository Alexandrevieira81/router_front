<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (sessionStorage.getItem('token')) {
			document.getElementById('resultado').innerHTML =
				' Usuário Autenticado Será Direcionado Para Página Principal';
			setTimeout(() => {
				goto('/centralizadora');
			}, 3000);
		} else {
			goto('/');
			document.getElementById('resultado').innerHTML = 'Usuário precisa ser autenticado!';
		}
	});
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
	<h1>Welcome</h1>
	<h2>
		<p id="resultado" />
	</h2>
	<button
		on:click={() => {
			goto('/login');
		}}
		type="button"
		>Login</button
	>
</body>
