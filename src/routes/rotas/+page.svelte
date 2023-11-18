<script>
	import { goto } from '$app/navigation';

	import { buscarRotas, buscarAllRotas, buscarAllSegmentos,bloquearDesbloquerSegmento } from '../services/rotas.js';
	import { onMount } from 'svelte';

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
		console.log(returnRotas);
		if (returnRotas.status == 200) {
			rotaReturn = await returnRotas.data.rota;
			document.getElementById('resultado').innerHTML = returnRotas.data.message;

			console.log(rotaReturn);
			desenharRota(rotaReturn);
		} else {
			document.getElementById('resultado').innerHTML = returnRotas.data.message;
		}
	};

	const allRota = async () => {
		returnAllRotas = null;

		//post.password = md5(post.password);

		returnAllRotas = await buscarAllRotas();
		console.log(returnAllRotas);
		if (returnAllRotas.status == 200) {
			rotaAllReturn = await returnAllRotas.data;

			console.log(rotaAllReturn);
		}
	};

	const bloquearDesbloquer = async (segmento) => {

		let statusSegmento = await bloquearDesbloquerSegmento(segmento);

		if (statusSegmento .status == 200) {
			document.getElementById('resultado').innerHTML = statusSegmento.data.message;
			//carregarPontos();
		} else {
			document.getElementById('resultado').innerHTML = statusSegmento.data.message;
		}
	};

	const allSegmentos = async () => {
		returnAllSegmentos = null;
		let listaIncial = [];
		let listaFinal = [];
		//post.password = md5(post.password);
		returnAllSegmentos = await buscarAllSegmentos();

		if (returnAllSegmentos.status == 200) {
			for (let value of returnAllSegmentos.data) {
				console.log(value.ponto_inicial);
				if (!listaIncial.includes(value.ponto_inicial)) listaIncial.push(value.ponto_inicial);
				if (!listaFinal.includes(value.ponto_final)) listaFinal.push(value.ponto_final);
			}
			prencherPontosIniciais(listaIncial);
			prencherPontosFinais(listaFinal);
		}
	};

	const desenharRota = async (segmentos) => {
		var x = 75;
		var y = 150;
		ctx.clearRect(0, 0, 500, 500);
		ctx.fillStyle = '#000';
		ctx.beginPath();

		for (let i = 0; i < segmentos.length; i++) {
			ctx.moveTo(x, y);
			if (segmentos[i].direcao === 'frente') {
				y = y - segmentos[i].distancia;
			}

			if (segmentos[i].direcao === 'direita') {
				x = x + segmentos[i].distancia;
			}
			if (segmentos[i].direcao === 'esquerda') {
				x = x - segmentos[i].distancia;
			}

			console.log(segmentos[i].direcao);
			console.log('y  ....' + y);
			console.log('x  ....' + x);

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

<section class="telarotas">
	<div class="telarotas_wrapper rotas">
		<h1>Welcome to the Jungle</h1>
		<div>
			<a href="/centralizadora">Home</a>
		</div>
		<p style="margin-top: 2px;">INICIO:</p>
		<input type="text" name="" id="" placeholder="Portaria" bind:value={buscaRotas.origem} />

		<p style="margin-top: 20px;">FIM:</p>
		<input
			type="text"
			name=""
			id=""
			style="margin-top: 2px;"
			placeholder="Capela"
			bind:value={buscaRotas.destino}
		/>
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

	<canvas id="rotaCanvas" width="150" height="150">
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
					<td class="text-center">{rotai.nome}</td>

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
							><button class="button" on:click={() => bloquearDesbloquer(rotai)}>Desbloquear</button
							></td
						>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	#rotaCanvas {
		border: 1px solid #000;
	}
</style>
