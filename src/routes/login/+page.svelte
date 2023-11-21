<script>
	import { goto } from '$app/navigation';
	import { loginUser } from '../services/user.js';
	import md5 from 'md5';
	import { limparSessao } from '../middleware/middleware.js';

	let returnLogin;
	let returnCadastro;
	let userLogin = {};
	/*
	onMount(async () => {
		if (sessionStorage.getItem('token')) goto('/');
	});
*/
	const logar = async () => {
		returnLogin = null;
		returnCadastro = null;
		let post = { ...userLogin };
		post.senha = md5(post.senha);
		var userReturn;

		//post.password = md5(post.password);

		returnLogin = await loginUser(post);
		console.log(returnLogin.data);
		if (returnLogin.status == 200 && returnLogin.data.success == true) {
			userReturn = {
				success: returnLogin.data.success,
				message: returnLogin.data.message
			};
			sessionStorage.setItem('user', JSON.stringify(userReturn)); //Aqui ainda só pega o status boleano e o msg de retorno
			sessionStorage.setItem('token', returnLogin.data.token);
			alert(userReturn.message);

			setTimeout(() => {
				goto('/centralizadora');
			}, 2000);
		} else if (returnLogin.status == 401) {
			userReturn = {
				success: returnLogin.data.success,
				message: returnLogin.data.message
			};
			limparSessao();
			alert(userReturn.message);
		} else if (returnLogin.status == 403) {
			userReturn = {
				success: returnLogin.data.success,
				message: returnLogin.data.message
			};

			alert(userReturn.message);
		} else {
			alert('Erro Fora do Protocolo');
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
	<section class="telalogin">
		<div class="telalogin_wrapper login">
			<h1>Welcome to the Jungle</h1>
			<h2>
				<p id="resultado" />
			</h2>
			<p style="margin-top: 2px;">Usuário:</p>
			<input type="text" name="" id="" placeholder="1488880" bind:value={userLogin.registro} />

			<p style="margin-top: 20px;">Senha:</p>
			<input
				type="text"
				name=""
				id=""
				style="margin-top: 2px;"
				placeholder="123456"
				bind:value={userLogin.senha}
			/>
		</div>
		<div>
			<button class="button" on:click={() => logar()}>Logar</button>
		</div>
	</section>
</body>

<style>
	.button {
		margin-top: 10px;
		margin-left: 45px;
	}
</style>
