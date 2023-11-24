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
		atualizarPonto,
		buscarPontoID
	} from '../services/pontos.js';
	import { onMount } from 'svelte';
	import { limparSessao } from '../middleware/middleware.js';

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

	let returnPontosID;
	let pontosReturnID = [];

	let returnPontosCarregados;
	let pontosReturnCarregados = [];

	let editId = null;
	let editIdPonto = null;
	let flag = 1;
	let flag2 = 1;

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
				console.log('Retorno do CADASTRAR Segmento ', segmentosCadastrado);

				if (segmentosCadastrado.status == 200) {
					alert(segmentosCadastrado.data.message);
					
				} else if (segmentosCadastrado.status == 401) {
					
					alert(segmentosCadastrado.data.message);
					limparSessao();
					
				} else if (segmentosCadastrado.status == 403) {
					alert(segmentosCadastrado.data.message);
					
				} else {
					alert('Ocorreu um erro inesperado');
				
				}
			} else {
				post.id = editId;
				const distancia = document.querySelector('#distancia');
				const direcao = document.querySelector('#direcao');
				const status = document.querySelector('#status');
				post.distancia = distancia.value;
				post.direcao = direcao.value;
				post.status = status.value;

				segmentosCadastrado = await atualizarSegmento(post);
				console.log('Retorno do ATUALIZAR Segmento ', segmentosCadastrado);

				if (segmentosCadastrado.status == 200) {
					
					alert(segmentosCadastrado.data.message);
				} else if (segmentosCadastrado.status == 401) {
					
					alert(segmentosCadastrado.data.message);
					limparSessao();
				} else if (segmentosCadastrado.status == 403) {
					alert(segmentosCadastrado.data.message);
				} else {
					alert('Ocorreu um erro inesperado');
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
				pontoCadastrado = await cadastrarPonto(post);
				console.log('Retorno do CADASTRAR Ponto ', pontoCadastrado);

				if (pontoCadastrado.status == 200) {
					alert(pontoCadastrado.data.message);
					carregarPontos();
				} else if (pontoCadastrado.status == 401) {
					alert(pontoCadastrado.data.message);
					limparSessao();
				} else if (pontoCadastrado.status == 403) {
					alert(pontoCadastrado.data.message);
				} else {
					alert('Ocorreu um erro inesperado');
				}
			} else {
				post.id = editIdPonto;
				//const nome = document.querySelector('NomePonto');

				//post.nome = dadosPonto.nome;

				pontoCadastrado = await atualizarPonto(post);
				console.log('Retorno do EDITAR o Ponto', pontoCadastrado);

				if (pontoCadastrado.status == 200) {
					alert( pontoCadastrado.data.message);
					carregarPontos();
				} else if (pontoCadastrado.status == 401) {
					alert( pontoCadastrado.data.message);
					limparSessao();
				} else if (pontoCadastrado.status == 403) {
					alert( pontoCadastrado.data.message);
				} else {
					alert('Ocorreu um erro inesperado');
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
	const cancelar = async () => {
		editId = null;
		document.getElementById('btnCadastrar').innerText = 'Cadastrar';
	};
	const delSegmento = async (id) => {
		returnSegmentos = null;
		if (confirm('Deseja Realmente Deletar o Segmento de Código ' + id)) {
			returnSegmentos = await deletarSegmento(id);
			console.log('Retorno do Deletar Segmento');
			console.log(returnSegmentos);
			if (returnSegmentos.status == 200) {
				alert(returnSegmentos.data.message);
				
				segmento();
			} else if (returnSegmentos.status == 401) {
				
				alert(returnSegmentos.data.message);
				limparSessao();
				
			} else if (returnSegmentos.status == 403) {
				alert(returnSegmentos.data.message);
				
			} else {
				alert('Ocorreu um erro inesperado');
				
			}
		}
	};

	const putPonto = async (ponto) => {
		//console.log(ponto, ' Pegou o atualizar');
		editIdPonto = ponto.id;
		//let pontoNome = document.getElementById('NomePonto');
		dadosPonto.nome = ponto.nome;

		document.getElementById('btnCadastrarPonto').innerText = 'Atualizar';
	};

	const delPonto = async (id) => {
		returnPontos = null;
		if (confirm('Deseja Realmente Deletar o Ponto de Código ' + id)) {
			returnPontos = await deletarPonto(id);
			console.log('Retorno do Deletar Ponto');
			console.log(returnPontos);
			if (returnPontos.status == 200) {
			
				alert(returnPontos.data.message);
				carregarPontos();
			} else if (returnPontos.status == 401) {
				alert(returnPontos.data.message);
				limparSessao();
			} else if (returnPontos.status == 403) {
				alert(returnPontos.data.message);
			} else {
				
				alert('Ocorreu um erro inesperado');
			}
		}
	};
	const pontoID = async (id) => {
		returnPontosID = null;

		returnPontosID = await buscarPontoID(id);
		console.log('Retorno do Caregando Pontos Pelo ID');
		console.log(returnPontosID.data);
		if (returnPontosID.status == 200) {
			document.getElementById('buscaPontos').innerHTML = returnPontosID.data.message;
			document.getElementById('buscaPontos').style.color = 'blue';
			dadosPonto.nome = returnPontosID.data.ponto.nome;
			pontosReturnID = returnPontosID.data.ponto;
			flag2 = 0;
		} else if (returnPontosID.status == 401) {
			limparSessao();
			document.getElementById('buscaPontos').innerHTML = returnPontosID.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
			alert(returnPontosID.data.message);
		} else if (returnPontosID.status == 403) {
			document.getElementById('buscaPontos').innerHTML = returnPontosID.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
			alert(returnPontosID.data.message);
		} else {
			document.getElementById('buscaPontos').innerHTML = 'Ocorreu um erro inesperado';
			document.getElementById('buscaPontos').style.color = 'red';
			alert('Ocorreu um erro inesperado');
		}
	};

	const segmentoID = async (id) => {
		returnSegmentosID = null;

		returnSegmentosID = await buscarSegmentoID(id);
		console.log('Retorno da Pesquisa de Segmento por ID');
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
			alert(returnSegmentosID.data.message);
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
		} else if (returnSegmentosID.status == 403) {
			document.getElementById('buscaPontos').innerHTML = returnSegmentosID.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
			alert(returnSegmentosID.data.message);
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
		} else {
			alert(returnSegmentosID.data.message);
			document.getElementById('buscaPontos').innerHTML = 'Ocorreu um erro inesperado';
			document.getElementById('buscaPontos').style.color = 'red';
		}
	};

	const segmento = async () => {
		flag = 1;
		returnSegmentos = null;
		returnSegmentos = await buscarSegmentos();
		console.log('Retorno de Todos os Segmentos');
		console.log(returnSegmentos);
		if (returnSegmentos.status == 200) {
			segmentoReturn = await returnSegmentos.data.segmentos;
			document.getElementById('buscaSegmentos').innerHTML = returnSegmentos.data.message;
			document.getElementById('buscaSegmentos').style.color = 'blue';
		} else if (returnSegmentos.status == 401) {
			limparSessao();
			document.getElementById('buscaPontos').innerHTML = returnSegmentos.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
			
		} else if (returnSegmentos.status == 403) {
			document.getElementById('buscaPontos').innerHTML = returnSegmentos.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
			
		} else {
			document.getElementById('buscaPontos').innerHTML = 'Ocorreu um erro inesperado';
			document.getElementById('buscaPontos').style.color = 'red';
			
		}
	};

	const carregarPontos = async () => {
		flag2 = 1;
		returnPontosCarregados = null;
		returnPontosCarregados = await buscarPontos();

		if (returnPontosCarregados.status == 200) {
			console.log('Retorno do Carregar Pontos');
			console.log(returnPontosCarregados.data);
			pontosReturnCarregados = await returnPontosCarregados.data.pontos;
			document.getElementById('buscaPontos').innerHTML = returnPontosCarregados.data.message;
			document.getElementById('buscaPontos').style.color = 'green';
		} else if (returnPontosCarregados.status == 401) {
			limparSessao();
			document.getElementById('buscaPontos').innerHTML = returnPontosCarregados.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
		} else if (returnPontosCarregados.status == 403) {
			document.getElementById('buscaPontos').innerHTML = returnPontosCarregados.data.message;
			document.getElementById('buscaPontos').style.color = 'red';
		} else {
			document.getElementById('buscaPontos').innerHTML = 'Ocorreu um erro inesperado';
			document.getElementById('buscaPontos').style.color = 'red';
		}
	};

	const iniciarPontos = async () => {
		flag2 = 1;
		returnPontos = null;
		returnPontos = await buscarPontos();
		// O texto de retorno foi removido, pois essa função inicia o combobox apenas
		if (returnPontos.status == 200) {
			console.log('Inciando os Pontos');
			console.log(returnPontos.data);
			pontosReturn = await returnPontos.data.pontos;
			//document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
			//document.getElementById('buscaPontos').style.color = 'green';
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

					<button class="button" id="btnCancelar" type="button" on:click={() => cancelar()}
						>Cancelar</button
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
										<td class="text-center"
											><button class="button" on:click={() => segmentoID(segmentoi.id)}
												>Buscar</button
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
							{#if flag2 == 1}
								{#each pontosReturnCarregados as pontoi}
									<tr>
										<!-- <td class="text-center">{rotai.nome_rota}</td> -->

										<td class="text-center">{pontoi.id}</td>
										<td class="text-center">{pontoi.nome}</td>

										<td class="text-center"
											><button class="button" on:click={() => putPonto(pontoi)}>Atualizar</button
											></td
										>
										<td class="text-center"
											><button class="button" on:click={() => delPonto(pontoi.id)}>Deletar</button
											></td
										>
										<td class="text-center"
											><button class="button" on:click={() => pontoID(pontoi.id)}>Buscar</button
											></td
										>
									</tr>
								{/each}
							{:else}
								<tr>
									<!-- <td class="text-center">{rotai.nome_rota}</td> -->

									<td class="text-center">{pontosReturnID.id}</td>
									<td class="text-center">{pontosReturnID.nome}</td>

									<td class="text-center"
										><button class="button" on:click={() => putPonto(pontosReturnID)}
											>Atualizar</button
										></td
									>
									<td class="text-center"
										><button class="button" on:click={() => delPonto(pontosReturnID.id)}
											>Deletar</button
										></td
									>
									<td class="text-center"
										><button class="button" on:click={() => pontoID(returnPontosID.id)}
											>Buscar</button
										></td
									>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
