<script>
	import { goto } from '$app/navigation';

	import {
		buscarRotas,
		buscarAllRotas,
		buscarAllSegmentos,
		bloquearDesbloquerSegmento
	} from '../services/rotas.js';
	import { onMount } from 'svelte';
	import { limparSessao } from '../middleware/middleware.js';

	let returnRotas;
	let rotaReturn = [];
	let returnAllRotas;
	let rotaAllReturn = [];
	let returnAllSegmentos;

	let buscaRotas = {};
	var canva = null;
	var ctx = null;
	onMount(async () => {
		canva = document.getElementById('rotaCanvas');
		ctx = canva.getContext('2d');
		allSegmentos();
	});

	const rota = async () => {
		returnRotas = null;

		let post = { ...buscaRotas };
		const inicial = document.querySelector('#pontosIniciais');
		const final = document.querySelector('#pontosFinais');

		//post.password = md5(post.password);

		post.origem = inicial.value;
		post.destino = final.value;
		returnRotas = await buscarRotas(post);
		console.log('Retorno do Calcular Rotas');
		console.log(returnRotas);
		if (returnRotas.status == 200) {
			rotaReturn = await returnRotas.data.rota;
			document.getElementById('resultado').style.color = 'blue';
			document.getElementById('resultado').innerHTML = returnRotas.data.message;
			desenharRota(rotaReturn);
		} else if (returnRotas.status == 400) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = returnRotas.data.message;
			ctx.clearRect(0, 0, 500, 500);
		} else if (returnRotas.status == 401) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = returnRotas.data.message;
			limparSessao();
		} else {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = 'Informe pontos de origem e destino válidos';
		}
	};

	const allRota = async () => {
		returnAllRotas = null;

		//post.password = md5(post.password);

		returnAllRotas = await buscarAllRotas();
		console.log('Retorno da busca de todas as Rotas');
		console.log(returnAllRotas);
		if (returnAllRotas.status == 200) {
			rotaAllReturn = await returnAllRotas.data;
			document.getElementById('resultado').style.color = 'blue';
			document.getElementById('resultado').innerHTML = 'Todas as Rotas Encontradas';
			//console.log(rotaAllReturn);
		} else if (returnRotas.status == 401) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = rotaAllReturn.message;
			limparSessao();
		} else if (returnRotas.status == 403) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = rotaAllReturn.message;
		} else {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = 'Ocorreu um erro inesperado';
		}
	};

	const bloquearDesbloquer = async (segmento) => {
		let statusSegmento = await bloquearDesbloquerSegmento(segmento);
		console.log('Retorno de Bloquear ou Desbloquear');
		console.log(statusSegmento);

		if (statusSegmento.status == 200) {
			document.getElementById('resultado').style.color = 'blue';
			document.getElementById('resultado').innerHTML = statusSegmento.data.message;
			//carregarPontos();
			allRota();
		} else if (returnRotas.status == 401) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = statusSegmento.data.message;
			limparSessao();
		} else if (returnRotas.status == 403) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = statusSegmento.data.message;
		} else {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = 'Ocorreu um erro inesperado';
		}
	};

	const allSegmentos = async () => {
		returnAllSegmentos = null;
		let listaIncial = [];
		let listaFinal = [];
		//post.password = md5(post.password);
		returnAllSegmentos = await buscarAllSegmentos();
		console.log('Retornou o que carrega os segmentos');
		console.log(returnAllSegmentos);

		if (returnAllSegmentos.status == 200) {
			for (let value of returnAllSegmentos.data.segmentos) {
				//console.log(value.ponto_inicial);
				if (!listaIncial.includes(value.ponto_inicial)) listaIncial.push(value.ponto_inicial);
				if (!listaFinal.includes(value.ponto_final)) listaFinal.push(value.ponto_final);
			}
			prencherPontosIniciais(listaIncial);
			prencherPontosFinais(listaFinal);
		} else if (returnAllSegmentos.status == 401) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = returnAllSegmentos.data.message;
			limparSessao();
		} else if (returnAllSegmentos.status == 403) {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = returnAllSegmentos.data.message;
		} else {
			document.getElementById('resultado').style.color = 'red';
			document.getElementById('resultado').innerHTML = 'Ocorreu um erro inesperado';
		}
	};

	const desenharRota = async (segmentos) => {
		var x = 150;
		var y = 250;
		ctx.clearRect(0, 0, 1500, 800);
		
		ctx.beginPath();
		ctx.fillStyle = "blue";

		for (let i = 0; i < segmentos.length; i++) {
			ctx.moveTo(x, y);
			if (segmentos[i].direcao.split(";")[0] === 'Frente') {
				y = y - (segmentos[i].distancia*2);
			}

			if (segmentos[i].direcao.split(";")[0] === 'Direita') {
				x = x + (segmentos[i].distancia*2);
			}
			if (segmentos[i].direcao.split(";")[0] === 'Esquerda') {
				x = x - (segmentos[i].distancia*2);
			}

			/* 		console.log(segmentos[i].direcao);
			console.log('y  ....' + y);
			console.log('x  ....' + x); */

			ctx.lineTo(x, y);

			ctx.lineWidth = 5;
			ctx.closePath();
			ctx.stroke();

			/* 	if (segmentos[i].direcao == 'frente') {
				ctx.fillStyle = '#000';
				ctx.fillRect(0, 0, 100, 100);
			}

			if (segmentos[i].direcao == 'direita') {
				ctx.fillStyle = 'rgba(255,0,0,0.5)';
				ctx.fillRect(10, 10, 100, 100);
			}
			if (segmentos[i].direcao == 'esquerda') {
				ctx.fillStyle = '#180874';
				ctx.fillRect(50, 50, 100, 100);
			} */
		}

		/*
		if (segmento.direcao == 'frente') {
	 		ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, 100, 100);
		}

		if (segmento.direcao == 'direita') {
			ctx.fillStyle = 'rgba(255,0,0,0.5)';
			ctx.fillRect(10, 10, 100, 100);
		}
		if (segmento.direcao == 'esquerda') {
			ctx.fillStyle = '#180874';
			ctx.fillRect(50, 50, 100, 100);
		}
 */
	};
	const prencherPontosIniciais = async (pontos) => {
		var selectPontos = document.getElementById('pontosIniciais');
		var option;
		for (var i = 0; i < pontos.length; i++) {
			option = document.createElement('option');
			option.value = pontos[i];
			option.text = pontos[i];
			selectPontos.appendChild(option);
		}
	};
	const prencherPontosFinais = async (pontos) => {
		var selectPontos = document.getElementById('pontosFinais');
		var option;
		for (var i = 0; i < pontos.length; i++) {
			option = document.createElement('option');
			option.value = pontos[i];
			option.text = pontos[i];
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
<body style="margin-left: 45px">
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
		crossorigin="anonymous"
	></script>
	<section class="telarotas">
		<div class="telarotas_wrapper rotas">
			<h1>Welcome to the Jungle</h1>
			<div>
				<a href="/centralizadora">Home</a>
			</div>
		
		</div>
		<div>
			<select name="" id="pontosIniciais" />
			<select name="" id="pontosFinais" />
		</div>

		<table
			class="table table-bordered table-striped"
			width="100%"
			style="box-shadow: 0 10px 40px #00000056;"
		>
			<thead>
				<tr>
					<!-- <th class="text-center">nome_rota</th> -->

					<th class="text-center">distancia</th>
					<th class="text-center">partida</th>
					<th class="text-center">chegada</th>
					<th class="text-center">direcao</th>
				</tr>
			</thead>
			<tbody>
				{#each rotaReturn as rotai}
					<tr>
						<!-- <td class="text-center">{rotai.nome_rota}</td> -->

						<td class="text-center">{rotai.distancia}</td>
						<td class="text-center">{rotai.ponto_inicial}</td>
						<td class="text-center">{rotai.ponto_final}</td>
						<td class="text-center">{rotai.direcao}</td>
						<!-- 	{#if rotai.status == 1}
							<td class="text-center">Desbloqueado</td>
						{/if}
						{#if rotai.status == 0}
							<td class="text-center">Bloqueado</td>
						{/if} -->
					</tr>
				{/each}
			</tbody>
		</table>

		<canvas id="rotaCanvas" width="300" height="250">
			<p>Teste</p>
		</canvas>

		<h2>
			<p id="resultado" />
		</h2>

		<div>
			<button class="button" on:click={() => rota()}>Buscar Rota</button>
		</div>

		<div>
			<button class="button" on:click={() => allRota()}>Buscar todas as Rotas</button>
		</div>
		<table
			class="table table-bordered table-striped"
			width="100%"
			style="box-shadow: 0 10px 40px #00000056;"
		>
			<thead>
				<tr>
					<th class="text-center">nome_rota</th>

					<th class="text-center">distancia</th>
					<th class="text-center">partida</th>
					<th class="text-center">chegada</th>
					<th class="text-center">direcao</th>
					<th class="text-center">status</th>
				</tr>
			</thead>
			<tbody>
				{#each rotaAllReturn as rotai}
					<tr>
						<td class="text-center">{rotai.nome_rota}</td>

						<td class="text-center">{rotai.distancia}</td>
						<td class="text-center">{rotai.ponto_inicial}</td>
						<td class="text-center">{rotai.ponto_final}</td>
						<td class="text-center">{rotai.direcao}</td>
						{#if rotai.status == 1}
							<td class="text-center">Desbloqueado</td>
							<td class="text-center"
								><button class="button" on:click={() => bloquearDesbloquer(rotai)}>Bloquer</button
								></td
							>
						{/if}
						{#if rotai.status == 0}
							<td class="text-center">Bloqueado</td>
							<td class="text-center"
								><button class="button" on:click={() => bloquearDesbloquer(rotai)}
									>Desbloquear</button
								></td
							>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</body>

<style>
	#rotaCanvas {
		border: 1px solid #000;
	}
</style>
