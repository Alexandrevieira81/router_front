<script>
	import { goto } from '$app/navigation';
	import { loginUser } from '../services/user.js';
	import md5 from 'md5';

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
		if ((returnLogin.status == 200) && (returnLogin.data.success == true)) {
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
		} else {
			userReturn = {
				success: returnLogin.data.success,
				message: returnLogin.data.message
			};
			alert(userReturn.message);
		}
	};
</script>

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

<style>
	.button {
		margin-top: 10px;
		margin-left: 45px;
	}
</style>
