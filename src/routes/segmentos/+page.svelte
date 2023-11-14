<script>
	import {
		buscarSegmentos,
		cadastrarSegmento,
		atualizarSegmento,
		deletarSegmento
	} from '../services/segmentos.js';
	import { buscarPontos, cadastrarPonto } from '../services/pontos.js';
	import { onMount } from 'svelte';

	let returnSegmentos;
	let segmentoReturn = [];

	let segmentosCadastrado;
	let dadosSegmentos = {};

	let pontoCadastrado;
	let dadosPonto = {};

	let returnPontos;
	let pontosReturn = [];

	let returnPontosCarregados;
	let pontosReturnCarregados = [];

	let editId = null;

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
				} else {
					document.getElementById('resultado').innerHTML = segmentosCadastrado.data.message;
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
				} else {
					document.getElementById('resultado').innerHTML = segmentosCadastrado.data.message;
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
		pontoCadastrado = null;

		let post = { ...dadosPonto };

		//post.password = md5(post.password);

		console.log('Dentro do Post Ponto', post);

		pontoCadastrado = await cadastrarPonto(post);

		if (pontoCadastrado.status == 200) {
			document.getElementById('resultado').innerHTML = pontoCadastrado.data.message;
			iniciarPontos();
		} else {
			document.getElementById('resultado').innerHTML = pontoCadastrado.data.message;
		}
	};

	const putSegmento = async (ponto) => {
		console.log(ponto, ' Pegou o atualizar');

		editId = ponto.id;

		let distancia = document.getElementById('distancia');
		distancia.value = ponto.distancia;

		let direcao = document.getElementById('direcao');
		direcao.value = ponto.direcao;

		let status = document.getElementById('status');
		status.value = ponto.status;

		let ponto_inicial = document.getElementById('pontosIniciais');
		ponto_inicial.value = ponto.ponto_inicial;

		let ponto_final = document.getElementById('pontosFinais');
		ponto_final.value = ponto.ponto_final;

		document.getElementById('btnCadastrar').innerText = 'Atualizar';
	};
	const delSegmento = async (id) => {
		returnSegmentos = null;
		if (confirm('Deseja Realmente Deletar o Segmento de Código ' + id)) {
			returnSegmentos = await deletarSegmento(id);
			console.log(returnSegmentos);
			if (returnSegmentos.status == 200) {
				document.getElementById('buscaSegmentos').innerHTML = returnSegmentos.data.message;
				document.getElementById('buscaSegmentos').style.color = 'blue';
				segmento();
			} else {
				document.getElementById('buscaSegmentos').innerHTML = returnSegmentos.data.message;
				document.getElementById('buscaSegmentos').style.color = 'red';
			}
		}
	};

	const segmento = async () => {
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

		if (returnPontos.status == 200) {
			console.log(returnPontos.data.pontos);
			pontosReturn = await returnPontos.data.pontos;
			document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
			document.getElementById('buscaPontos').style.color = 'green';
			console.log(pontosReturn);
		} else {
			document.getElementById('buscaPontos').style.color = 'red';
			document.getElementById('buscaPontos').innerHTML = returnPontos.data.message;
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

<h1>SEGMENTOS</h1>
<div>
	<a href="/centralizadora">Home</a>
</div>

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
</div>
<h2>
	<p id="buscaSegmentos" style="margin-left: 20px;" />
</h2>
<div style="margin: 20px 20px 20px 20px;">
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
						><button class="button" on:click={() => putSegmento(segmentoi)}>Atualizar</button></td
					>
					<td class="text-center"
						><button class="button" on:click={() => delSegmento(segmentoi.id)}>Deletar</button></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div>
	<button style="margin-left: 20px;" class="button" on:click={() => segmento()}
		>Buscar Segmentos</button
	>
</div>

<h3>Cadastro de Ponto</h3>

<div style="margin-top: 20px;">
	<p style="margin-top: 2px;">Nome do Ponto:</p>
	<input type="text" name="" id="registro" bind:value={dadosPonto.nome} />

	<div style="margin-top: 20px;">
		<button class="button" id="btnCadastrar" type="button" on:click={() => inserirPonto()}
			>Cadastrar</button
		>
	</div>
</div>

<h2>
	<p id="buscaPontos" style="margin-left: 20px;" />
</h2>

<div style="margin: 20px 20px 20px 20px;">
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
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div>
	<button style="margin-left: 20px;" class="button" on:click={() => carregarPontos()}
		>Buscar Pontos</button
	>
</div>
