<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {

       
		if (sessionStorage.getItem('token')) {

            document.getElementById('resultado').innerHTML = " Usuário Autenticado Será Direcionado Para Página Principal";
            setTimeout(() => {
				goto('/centralizadora');
			}, 3000);
			
		} else {
			goto('/');
			document.getElementById('resultado').innerHTML = 'Usuário precisa ser autenticado!';
		}
	});
</script>

<h1>Welcome</h1>
<h2>
	<p id="resultado" />
</h2>
<button
	on:click={() => {
		goto('/login');
	}}
	type="button"
	class="btn text-white nav-link">Login</button
>
