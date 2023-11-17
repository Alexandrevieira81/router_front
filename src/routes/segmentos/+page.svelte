<script>
	import {
		buscarSegmentos,
		cadastrarSegmento,
		atualizarSegmento,
		deletarSegmento,
		buscarSegmentoID
	} from '../services/segmentos.js';
	import { goto } from '$app/navigation';
	import {
		buscarPontos,
		cadastrarPonto,
		deletarPonto,
		atualizarPonto
	} from '../services/pontos.js';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let returnSegmentos;
	let segmentoReturn = [];

	let returnSegmentosID;
	let segmentoReturnID = [];

	let segmentosCadastrado;
	let dadosSegmentos = {};

	let pontoCadastrado;
	let dadosPonto = {};

	let returnPontos;
	let pontosReturn = [];

	let returnPontosCarregados;
	let pontosReturnCarregados = [];

	let editId = null;
	let editIdPonto = null;
	let flag = 1;

	onMount(async () => {
		iniciarPontos();
	});

	const inserirSegmento = async () => {
		try {
			segmentosCadastrado = null;
			let post = { ...dadosSegmentos };
			const inicial = document.querySelector('#pontosIniciais');
			const final = document.querySelector('#pontosFinais');
			post.ponto_inicial = inicial.value;
			post.ponto_final = final.value;

			if (editId == null) {
				segmentosCadastrado = await cadastrarSegmento(post);

				if (segmentosCadastrado.status == 200) {
					document.getElementById('resultado').innerHTML = segmentosCadastrado.data.message;
					document.getElementById('resultado').style.color = 'blue';
				} else {
					document.getElementById('resultado').innerHTML = segmentosCadastrado.data.message;
					document.getElementById('resultado').style.color = 'red';
				}
			} else {
				console.log('Dentro do Post editar', post);
				post.id = editId;
				const distancia = document.querySelector('#distancia');
				const direcao = document.querySelector('#direcao');
				const status = document.querySelector('#status');
				post.distancia = distancia.value;
				post.direcao = direcao.value;
				post.status = status.value;

				segmentosCadastrado = await atualizarSegmento(post);

				if (segmentosCadastrado.status == 200) {
					document.getElementById('resultado').innerHTML = segmentosCadastrado.data.message;
				} else if (segmentosCadastrado.status == 401) {
					alert(segmentosCadastrado.data.message);
					limparSessao();
				} else {
					alert(segmentosCadastrado.data.message);
					limparSessao();
				}
			}
		} catch (error) {
			console.log('Erro de Inserção ou Atualização do segmento');
		} finally {
			document.getElementById('btnCadastrar').innerText = 'Cadastrar';
			editId = null;
			segmento();
		}
	};

	const inserirPonto = async () => {
		try {
			pontoCadastrado = null;
			let post = { ...dadosPonto };

			if (editIdPonto == null) {
				console.log('Dentro do Post Ponto Inserção ', post);
				pontoCadastrado = await cadastrarPonto(post);
				console.log('Retorno do banco ', pontoCadastrado);

				if (pontoCadastrado.status == 200) {
					document.getElementById('buscaPontos').innerHTML = pontoCadastrado.data.message;
					//iniciarPontos();
				} else {
					document.getElementById('buscaPontos').innerHTML = pontoCadastrado.data.message;
				}
			} else {
				post.id = editIdPonto;
				//const nome = document.querySelector('NomePonto');

				//post.nome = dadosPonto.nome;
				console.log('Dentro do Post editar', post);

				pontoCadastrado = await atualizarPonto(post);

				if (pontoCadastrado.status == 200) {
					document.getElementById('buscaPontos').innerHTML = pontoCadastrado.data.message;
				} else {
					document.getElementById('buscaPontos').innerHTML = pontoCadastrado.data.message;
				}
			}
		} catch (error) {
			console.log('Erro de Inserção ou Atualização do Ponto');
		} finally {
			document.getElementById('btnCadastrarPonto').innerText = 'Cadastrar';
			editIdPonto = null;
		}
	};

	const putSegmento = async (segmento) => {
		console.log(segmento, ' Pegou o atualizar');

		editId = segmento.id;

		let distancia = document.getElementById('distancia');
		distancia.value = segmento.distancia;

		let direcao = document.getElementById('direcao');
		direcao.value = segmento.direcao;

		let status = document.getElementById('status');
		status.value = segmento.status;

		let ponto_inicial = document.getElementById('pontosIniciais');
		ponto_inicial.value = segmento.ponto_inicial;

		let ponto_final = document.getElementById('pontosFinais');
		ponto_final.value = segmento.ponto_final;

		document.getElementById('btnCadastrar').innerText = 'Atualizar';
	};
	const delSegmento = async (id) => {
		returnSegmentos = null;
		if (confirm('Deseja Realmente Deletar o Segmento de Código ' + id)) {
			returnSegmentos = await deletarSegmento(id);
			console.log(returnSegmentos);
			if (returnSegmentos.status == 200) {
				document.getElementById('resultado').innerHTML = returnSegmentos.data.message;
				document.getElementById('resultado').style.color = 'blue';
				segmento();
			} else {
				document.getElementById('resultado').innerHTML = returnSegmentos.data.message;
				document.getElementById('resultado').style.color = 'red';
			}
		}
	};

	const putPonto = async (ponto) => {
		console.log(ponto, ' Pegou o atualizar');

		editIdPonto = ponto.id;

		//let pontoNome = document.getElementById('NomePonto');
		dadosPonto.nome = ponto.nome;

		document.getElementById('btnCadastrarPonto').innerText = 'Atualizar';
	};
	const delPonto = async (id) => {
		returnPontos = null;
		if (confirm('Deseja Realmente Deletar o Ponto de Código ' + id)) {
			returnPontos = await deletarPonto(id);
			console.log(returnPontos);
			if (returnPontos.status == 200) {
				document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
				document.getElementById('buscaPontos').style.color = 'blue';
				segmento();
			} else {
				document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
				document.getElementById('buscaPontos').style.color = 'red';
			}
		}
	};

	const segmentoID = async () => {
		returnSegmentosID = null;

		console.log('Pegou o id do input ' + dadosSegmentos.id);
		returnSegmentosID = await buscarSegmentoID(dadosSegmentos.id);

		if (returnSegmentosID.status == 200) {
			segmentoReturnID = await returnSegmentosID.data.segmento;
			console.log(segmentoReturnID);
			document.getElementById('buscaSegmentos').innerHTML = returnSegmentosID.data.message;
			document.getElementById('buscaSegmentos').style.color = 'blue';
			let distancia = document.getElementById('distancia');
			distancia.value = segmentoReturnID.distancia;

			let direcao = document.getElementById('direcao');
			direcao.value = segmentoReturnID.direcao;

			let status = document.getElementById('status');
			status.value = segmentoReturnID.status;
			flag = 0;

			/* 	let ponto_inicial = document.getElementById('pontosIniciais');
			ponto_inicial.value = segmentoReturnID.ponto_inicial;

			let ponto_final = document.getElementById('pontosFinais');
			ponto_final.value = segmentoReturnID.ponto_final; */
		} else if (returnSegmentosID.status == 401) {
			document.getElementById('buscaSegmentos').innerHTML = returnSegmentosID.data.message;
			document.getElementById('buscaSegmentos').style.color = 'red';
			let distancia = document.getElementById('distancia');
			distancia.value = '';

			let direcao = document.getElementById('direcao');
			direcao.value = '';

			let status = document.getElementById('status');
			status.value = '';

			let ponto_inicial = document.getElementById('pontosIniciais');
			ponto_inicial.value = '';

			let ponto_final = document.getElementById('pontosFinais');
			ponto_final.value = '';
			alert(returnSegmentosID.data.message);
			limparSessao();
		} else {
			alert(returnSegmentosID.data.message);
		}
	};

	const segmento = async () => {
		flag = 1;
		returnSegmentos = null;
		returnSegmentos = await buscarSegmentos();
		console.log(returnSegmentos);
		if (returnSegmentos.status == 200) {
			segmentoReturn = await returnSegmentos.data.segmentos;
			document.getElementById('buscaSegmentos').innerHTML = returnSegmentos.data.message;
			document.getElementById('buscaSegmentos').style.color = 'blue';
		} else {
			document.getElementById('buscaSegmentos').innerHTML = returnSegmentos.data.message;
			document.getElementById('buscaSegmentos').style.color = 'red';
		}
	};

	const carregarPontos = async () => {
		returnPontosCarregados = null;
		returnPontosCarregados = await buscarPontos();

		if (returnPontosCarregados.status == 200) {
			console.log(returnPontosCarregados.data.pontos);
			pontosReturnCarregados = await returnPontosCarregados.data.pontos;
			document.getElementById('buscaPontos').innerHTML = returnPontosCarregados.data.message;
			document.getElementById('buscaPontos').style.color = 'green';
			console.log(pontosReturnCarregados);
		} else {
			document.getElementById('buscaPontos').style.color = 'red';
			document.getElementById('buscaPontos').innerHTML = returnPontosCarregados.data.message;
		}
	};

	const iniciarPontos = async () => {
		returnPontos = null;
		returnPontos = await buscarPontos();
		// O texto de retorno foi removido, pois essa função inicia o combobox apenas
		if (returnPontos.status == 200) {
			console.log(returnPontos.data.pontos);
			pontosReturn = await returnPontos.data.pontos;
			//document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
			//document.getElementById('buscaPontos').style.color = 'green';
			console.log(pontosReturn);
		} else {
			//document.getElementById('buscaPontos').style.color = 'red';
			//document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
		}
		prencherPontosIniciais(pontosReturn);
		prencherPontosFinais(pontosReturn);
	};

	const prencherPontosIniciais = async (pontos) => {
		var selectPontos = document.getElementById('pontosIniciais');
		var option;

		for (var i = 0; i < pontos.length; i++) {
			option = document.createElement('option');
			option.value = pontos[i].id;
			option.text = pontos[i].nome;
			selectPontos.appendChild(option);
		}
	};
	const prencherPontosFinais = async (pontos) => {
		var selectPontos = document.getElementById('pontosFinais');
		var option;
		for (var i = 0; i < pontos.length; i++) {
			option = document.createElement('option');
			option.value = pontos[i].id;
			option.text = pontos[i].nome;
			selectPontos.appendChild(option);
		}
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

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
		crossorigin="anonymous"
	/>
</svelte:head>

<body>
	<div>
		<a href="/centralizadora">Home</a>
	</div>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
		crossorigin="anonymous"
	></script>

	<div class="container">
		<div class="row">
			<div class="col-sm">
				<h3>CADASTRO DE SEGMENTOS</h3>
				<h2>
					<p id="resultado" style="margin-left: 20px;" />
				</h2>
				<div>
					<input type="text" name="" id="inputPesquisarSegmento" bind:value={dadosSegmentos.id} />
					<button
						class="button"
						id="btnPesquisarSegmento"
						type="button"
						on:click={() => segmentoID()}>Buscar</button
					>
				</div>

				<p style="margin-top: 2px;">Distância:</p>
				<input type="text" name="" id="distancia" bind:value={dadosSegmentos.distancia} />

				<p style="margin-top: 20px;">Direção:</p>
				<input
					type="text"
					name=""
					id="direcao"
					style="margin-top: 2px;"
					bind:value={dadosSegmentos.direcao}
				/>

				<p style="margin-top: 20px;">Status:</p>
				<input
					type="number"
					name=""
					id="status"
					style="margin-top: 2px;"
					bind:value={dadosSegmentos.status}
				/>

				<div style="margin-top: 20px;">
					<select name="" id="pontosIniciais" />
					<select name="" id="pontosFinais" />
				</div>

				<div style="margin-top: 20px;">
					<button class="button" id="btnCadastrar" type="button" on:click={() => inserirSegmento()}
						>Cadastrar</button
					>
					<button style="margin-left: 20px;" class="button" on:click={() => segmento()}
						>Buscar Segmentos</button
					>
				</div>
				<h2>
					<p id="buscaSegmentos" style="margin-left: 20px;" />
				</h2>
				<div style="margin-top 20px;">
					<table
						id="tableSegmentos"
						class="table table-bordered table-striped"
						width="100%"
						style="box-shadow: 0 10px 40px #00000056;"
					>
						<thead>
							<tr>
								<!-- <th class="text-center">nome_rota</th> -->
								<th class="text-center">Código</th>
								<th class="text-center">distancia</th>
								<th class="text-center">partida</th>
								<th class="text-center">chegada</th>
								<th class="text-center">direcao</th>
								<th class="text-center">status</th>
							</tr>
						</thead>
						<tbody>
							{#if flag == 1}
								{#each segmentoReturn as segmentoi}
									<tr>
										<!-- <td class="text-center">{rotai.nome_rota}</td> -->
										<td class="text-center">{segmentoi.id}</td>
										<td class="text-center">{segmentoi.distancia}</td>
										<td class="text-center">{segmentoi.ponto_inicial}</td>
										<td class="text-center">{segmentoi.ponto_final}</td>
										<td class="text-center">{segmentoi.direcao}</td>
										<td class="text-center">{segmentoi.status}</td>
										<td class="text-center"
											><button class="button" on:click={() => putSegmento(segmentoi)}
												>Atualizar</button
											></td
										>
										<td class="text-center"
											><button class="button" on:click={() => delSegmento(segmentoi.id)}
												>Deletar</button
											></td
										>
									</tr>
								{/each}
							{:else}
								<tr>
									<!-- <td class="text-center">{rotai.nome_rota}</td> -->
									<td class="text-center">{segmentoReturnID.id}</td>
									<td class="text-center">{segmentoReturnID.distancia}</td>
									<td class="text-center">{segmentoReturnID.ponto_inicial}</td>
									<td class="text-center">{segmentoReturnID.ponto_final}</td>
									<td class="text-center">{segmentoReturnID.direcao}</td>
									<td class="text-center">{segmentoReturnID.status}</td>
									<td class="text-center"
										><button class="button" on:click={() => putSegmento(segmentoReturnID)}
											>Atualizar</button
										></td
									>
									<td class="text-center"
										><button class="button" on:click={() => delSegmento(segmentoReturnID.id)}
											>Deletar</button
										></td
									>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-sm">
				<h3>CADASTRO DE PONTOS</h3>

				<div style="margin-top: 20px;">
					<p style="margin-top: 2px;">Nome do Ponto:</p>
					<input type="text" name="" id="NomePonto" bind:value={dadosPonto.nome} />

					<div style="margin-top: 20px;">
						<button
							class="button"
							id="btnCadastrarPonto"
							type="button"
							on:click={() => inserirPonto()}>Cadastrar</button
						>
						<button style="margin-left: 20px;" class="button" on:click={() => carregarPontos()}
							>Buscar Pontos</button
						>
					</div>
				</div>

				<h2>
					<p id="buscaPontos" style="margin-left: 20px;" />
				</h2>

				<div style="margin-top">
					<table
						class="table table-bordered table-striped"
						width="100%"
						style="box-shadow: 0 10px 40px #00000056;"
						id="tablePontos"
					>
						<thead>
							<tr>
								<!-- <th class="text-center">nome_rota</th> -->

								<th class="text-center">Código</th>
								<th class="text-center">Nome</th>
							</tr>
						</thead>
						<tbody>
							{#each pontosReturnCarregados as pontoi}
								<tr>
									<!-- <td class="text-center">{rotai.nome_rota}</td> -->

									<td class="text-center">{pontoi.id}</td>
									<td class="text-center">{pontoi.nome}</td>

									<td class="text-center"
										><button class="button" on:click={() => putPonto(pontoi)}>Atualizar</button></td
									>
									<td class="text-center"
										><button class="button" on:click={() => delPonto(pontoi.id)}>Deletar</button
										></td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
