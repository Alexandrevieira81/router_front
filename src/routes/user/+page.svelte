<script>
	import {
		cadastrarUser,
		buscarUser,
		AtualizarUser,
		DeletarUser,
		buscarAllUser
	} from '../services/user.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import md5 from 'md5';

	let returnUser;
	let userReturn = [];
	let user = {};
	let getId = {};

	onMount(async () => {
		let btnCadastrar = document.getElementById('btnCadastrar');
		btnCadastrar.disabled = true;
		let btnAtualizar = document.getElementById('btnAtualizar');
		btnAtualizar.disabled = true;
		let btnDeletar = document.getElementById('btnDeletar');
		btnDeletar.disabled = true;
		let btnCancelar = document.getElementById('btnCancelar');
		btnCancelar.disabled = true;
		buscarAll();
	});
	const cadastrar = async () => {
		returnUser = null;
		try {
			let post = { ...user };
			post.senha = md5(post.senha);
			returnUser = await cadastrarUser(post);
			console.log(returnUser.data);
			if (returnUser.status == 200) {
				alert(returnUser.data.message);
				cancelar();
			} else if (returnUser.status == 401) {
				alert(returnUser.data.message);
				limparSessao();
			} else {
				alert(returnUser.data.message);
			}
		} catch (error) {
			alert('Erro Fora do Protocolo');
		} finally {
			buscarAll();
		}
	};

	const cancelar = async () => {
		let btnCadstrar = document.getElementById('btnCadastrar');
		btnCadstrar.disabled = true;
		let btnAtualizar = document.getElementById('btnAtualizar');
		btnAtualizar.disabled = true;
		let btnDeletar = document.getElementById('btnDeletar');
		btnDeletar.disabled = true;
		let btnCancelar = document.getElementById('btnCancelar');
		btnCancelar.disabled = true;
		let btnNovo = document.getElementById('btnNovo');
		btnNovo.disabled = false;
		document.getElementById('resultado').innerHTML = '';
	};

	const preparaAtualizar = async (usuario) => {
		getId.registro = usuario.registro;
		let btnCadastrar = document.getElementById('btnCadastrar');
		btnCadastrar.disabled = true;
		let btnAtualizar = document.getElementById('btnAtualizar');
		btnAtualizar.disabled = false;
		let btnDeletar = document.getElementById('btnDeletar');
		btnDeletar.disabled = true;
		let btnNovo = document.getElementById('btnNovo');
		btnNovo.disabled = true;
		let btnCancelar = document.getElementById('btnCancelar');
		btnCancelar.disabled = false;
		buscar();
	};

	const preparaDeletar = async (usuario) => {
		console.log(usuario, ' Pegou o deletar');
		getId.registro = usuario.registro;
		let btnCadstrar = document.getElementById('btnCadastrar');
		btnCadstrar.disabled = true;
		let btnAtualizar = document.getElementById('btnAtualizar');
		btnAtualizar.disabled = true;
		let btnDeletar = document.getElementById('btnDeletar');
		btnDeletar.disabled = false;
		let btnNovo = document.getElementById('btnNovo');
		btnNovo.disabled = true;
		let btnCancelar = document.getElementById('btnCancelar');
		btnCancelar.disabled = false;
		buscar();
	};

	const atualizar = async () => {
		try {
			let post = { ...user };
			let postRegistro;
			post.senha = md5(post.senha);
			postRegistro = post.registro;
			delete post.tipo_usuario;
			delete post.registro;
			returnUser = await AtualizarUser(post, postRegistro);
			console.log(returnUser.data);

			if (returnUser.status == 200) {
				alert(returnUser.data.message);
				cancelar();
				user.registro = '';
				user.nome = '';
				user.email = '';
				user.senha = '';
				user.tipo_usuario = '';
			} else if (returnUser.status == 401) {
				limparSessao();
			} else {
				alert(returnUser.data.message);
			}
		} catch (error) {
			alert('Erro Fora do Protocolo');
		} finally {
			buscarAll();
			//cancelar();
		}
	};

	const deletar = async () => {
		returnUser = null;

		try {
			let post = user.registro;
			if (confirm('Deseja Realmente Deletar o Usuário Com o Registro ' + post+' ?')) {
				returnUser = await DeletarUser(post);
				console.log(returnUser.data);
				if (returnUser.status == 200) {
					cancelar();
					alert(returnUser.data.message);
					user.registro = '';
					user.nome = '';
					user.email = '';
					user.senha = '';
					user.tipo_usuario = '';
				} else if (returnUser.status == 401) {
					limparSessao();
				} else {
					alert(returnUser.data.message);
				}
			}
		} catch (error) {
			alert('Erro Fora do Protocolo');
		} finally {
			buscarAll();
			cancelar();
		}
	};

	const buscarAll = async () => {
		returnUser = null;

		try {
			returnUser = await buscarAllUser();
			console.log(returnUser.data);
			if (returnUser.status == 200) {
				userReturn = await returnUser.data.usuarios;
				/* document.getElementById('resultado').innerHTML = returnUser.data.message;
				document.getElementById('resultado').style.color = 'blue'; */
			} else if (returnUser.status == 401) {
				limparSessao();
			} else {
				document.getElementById('resultado').innerHTML = returnUser.data.message;
				document.getElementById('resultado').style.color = 'red';
			}
		} catch (error) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = 'Erro Fora do Protocolo';
		}
	};

	const buscar = async () => {
		returnUser = null;

		try {
			returnUser = await buscarUser(getId.registro);
			console.log(returnUser);
			if (returnUser.status == 200) {
				document.getElementById('resultado').style.color = 'blue';
				document.getElementById('resultado').innerHTML = returnUser.data.message;

				/* let registro = document.getElementById('registro');
				registro.value = returnUser.data.usuarios.registro; */
				user.registro = returnUser.data.usuario.registro;
				/* let nome = document.getElementById('nome');
				nome.value = returnUser.data.usuarios.nome; */
				user.nome = returnUser.data.usuario.nome;
				/* let email = document.getElementById('email');
				email.value = returnUser.data.usuarios.email; */
				user.email = returnUser.data.usuario.email;
				/* let senha = document.getElementById('senha');
				senha.value = ''; */
				user.senha = '';
				/* let tipo = document.getElementById('tipo');
				tipo.value = returnUser.data.usuarios.tipo_usuario; */
				user.tipo_usuario = returnUser.data.usuario.tipo_usuario;

				let btnCadastrar = document.getElementById('btnCadastrar');
				btnCadastrar.disabled = true;
				let btnAtualizar = document.getElementById('btnAtualizar');
				btnAtualizar.disabled = false;
				let btnDeletar = document.getElementById('btnDeletar');
				btnDeletar.disabled = false;
				let btnNovo = document.getElementById('btnNovo');
				btnNovo.disabled = true;
				let btnCancelar = document.getElementById('btnCancelar');
				btnCancelar.disabled = false;
			} else if (returnUser.status == 401) {
				limparSessao();
			} else {
				document.getElementById('resultado').style.color = 'red';
				document.getElementById('resultado').innerHTML = returnUser.data.message;
			}
		} catch (error) {
			alert('Erro Fora do Protocolo');
		}
	};

	const novo = async () => {
		let btnCadstrar = document.getElementById('btnCadastrar');
		btnCadstrar.disabled = false;
		let btnAtualizar = document.getElementById('btnAtualizar');
		btnAtualizar.disabled = true;
		let btnDeletar = document.getElementById('btnDeletar');
		btnDeletar.disabled = true;
		let btnNovo = document.getElementById('btnNovo');
		btnNovo.disabled = true;
		let btnCancelar = document.getElementById('btnCancelar');
		btnCancelar.disabled = false;
		let registro = document.getElementById('registro');
		registro.value = '';
		let nome = document.getElementById('nome');
		nome.value = '';
		let email = document.getElementById('email');
		email.value = '';
		let senha = document.getElementById('senha');
		senha.value = '';
		let tipo = document.getElementById('tipo');
		tipo.value = '';
	};
	const limparSessao = async () => {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');
		document.getElementById('resultado').innerHTML =
			'Usuário não Autenticado, Você Será Redirecionado para o Login';
		setTimeout(() => {
			goto('/');
		}, 2000);
	};
</script>

<section class="telaCadastroUsuario">
	<div class="telaCadastroUsuario_wrapper usuario">
		<h1>Welcome to the Jungle</h1>
		<a href="/centralizadora">Home</a>

		<div>
			<input type="text" name="" id="buscarRegistro" bind:value={getId.registro} />

			<button class="button" on:click={() => buscar()}>Buscar</button>
		</div>

		<p style="margin-top: 2px;">Registro:</p>
		<input type="text" name="" id="registro" bind:value={user.registro} />

		<p style="margin-top: 20px;">Nome:</p>
		<input type="text" name="" id="nome" style="margin-top: 2px;" bind:value={user.nome} />

		<p style="margin-top: 20px;">Email:</p>
		<input type="text" name="" id="email" style="margin-top: 2px;" bind:value={user.email} />

		<p style="margin-top: 20px;">Senha:</p>
		<input type="text" name="" id="senha" style="margin-top: 2px;" bind:value={user.senha} />

		<p style="margin-top: 20px;">Tipo de Usuário:</p>
		<input
			type="number"
			name=""
			id="tipo"
			style="margin-top: 2px;"
			bind:value={user.tipo_usuario}
		/>
	</div>

	<h2>
		<p id="resultado" />
	</h2>

	<div>
		<button class="button" id="btnNovo" type="button" on:click={() => novo()}>Novo</button>
		<button class="button" id="btnCadastrar" type="button" on:click={() => cadastrar()}
			>Cadastrar</button
		>
		<button class="button" id="btnAtualizar" type="button" on:click={() => atualizar()}
			>Atualizar</button
		>
		<button class="button" id="btnDeletar" type="button" on:click={() => deletar()}>Deletar</button>
		<button class="button" id="btnCancelar" type="button" on:click={() => cancelar()}
			>Cancelar</button
		>
	</div>
	<div style="margin: 20px 20px 20px 20px;">
		<table
			id="tableUsuarios"
			class="table table-bordered table-striped"
			width="100%"
			style="box-shadow: 0 10px 40px #00000056;"
		>
			<thead>
				<tr>
					<!-- <th class="text-center">nome_rota</th> -->
					<th class="text-center">Registro</th>
					<th class="text-center">Nome</th>
					<th class="text-center">Email</th>
					<th class="text-center">Tipo</th>
				</tr>
			</thead>
			<tbody>
				{#each userReturn as useri}
					<tr>
						<!-- <td class="text-center">{rotai.nome_rota}</td> -->
						<td class="text-center">{useri.registro}</td>
						<td class="text-center">{useri.nome}</td>
						<td class="text-center">{useri.email}</td>
						{#if useri.tipo_usuario == 1}
							<td class="text-center">Administrador</td>
						{/if}
						{#if useri.tipo_usuario == 0}
							<td class="text-center">Usuário Comum</td>
						{/if}

						<td class="text-center"
							><button class="button" on:click={() => preparaAtualizar(useri)}>Atualizar</button
							></td
						>
						<td class="text-center"
							><button class="button" on:click={() => preparaDeletar(useri)}>Deletar</button></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.button {
		margin-top: 10px;
		margin-left: 45px;
	}
</style>
