// Esse arquivo possui todas as funções de manipulação da página HTML, trabalhando com DOM

const mostrarRegras = () => {
  const painelJogo = document.getElementById("painel-jogo");
  const botoes = Array.from(painelJogo.querySelectorAll("h1"));
  botoes.map(botao => botao.setAttribute("hidden", ""));
  const containerRegras = document.createElement("div");
  containerRegras.setAttribute("id", "container-regras");
  const botaoFecharRegras = document.createElement("button");
  botaoFecharRegras.onclick = fecharRegras;
  botaoFecharRegras.innerText = 'X';
  const textoRegras = document.createElement("p");
  textoRegras.innerHTML =
    `Este jogo é baseado no clássico jogo da velha, porém com algumas adições que trazem um certo dinamismo ao jogo.
    <br>
    <br>

    <strong>Dinâmica do jogo:</strong>
    <br>
    <br>
    
    O jogo é formado por um tabuleiro grande de dimensões 3 x 3 e cada posição desse tabuleiro é ocupado por um outro tabuleiro 3 x 3. É neste tabuleiro menor que o jogo é jogado de fato.<br>
    Os jogadores irão jogar os seus símbolos nos tabuleiros pequenos, respeitando o turno de cada jogador, quando um jogador completa uma linha, ou coluna, ou diagonal com o seu símbolo, o tabuleiro é finalizado com a vitória desse jogador.<br>
    Sempre que um tabuleiro pequeno é finalizado, ele é substituído pelo símbolo vencedor daquele tabuleiro, caso ocorra um empate, é substituído por um símnbolo coringa.
    <br>
    <br>
    
    <strong>Objetivo:</strong>
    <br>
    <br>
    
    Os jogadores têm como objetivo completar uma linha, ou coluna, ou diagonal do tabuleiro maior com o seu símbolo para assim se consagrar o grande vencedor!`
  
  containerRegras.appendChild(botaoFecharRegras);
  containerRegras.appendChild(textoRegras);
  painelJogo.appendChild(containerRegras);
}

const fecharRegras = () => {
  const painelJogo = document.getElementById("painel-jogo");
  const containerRegras = document.getElementById("container-regras");
  painelJogo.removeChild(containerRegras);

  const botoes = Array.from(painelJogo.querySelectorAll("h1"));
  botoes.map(botao => botao.removeAttribute("hidden"));
}

const configurarJogo = () => {
  const painelJogo = document.getElementById("painel-jogo");
  painelJogo.innerHTML = '';

  const configuracoesJogo = document.createElement("div");
  configuracoesJogo.setAttribute("id", "configuracoes-jogo");

  const formularioPrimeiroJogador = criarFormularioJogador("primeiro-jogador", 1);
  const formularioSegundoJogador = criarFormularioJogador("segundo-jogador", 2);
  const formularioTabuleiro = criarFormularioTabuleiro("tabuleiro");
  
  const botaoIniciar = document.createElement("button");
  botaoIniciar.setAttribute("id", "botao-iniciar");
  botaoIniciar.onclick = iniciarJogo;
  botaoIniciar.innerText = "Iniciar";
  
  configuracoesJogo.appendChild(formularioPrimeiroJogador);
  configuracoesJogo.appendChild(formularioSegundoJogador);
  configuracoesJogo.appendChild(formularioTabuleiro);
  configuracoesJogo.appendChild(botaoIniciar);
  
  painelJogo.appendChild(configuracoesJogo);
  
  function criarFormularioJogador(idFormulario, numeroJogador) {
    const formulario = document.createElement("form");
    formulario.setAttribute("id", idFormulario);
    formulario.innerHTML =
      `
      <h1>Jogador ${numeroJogador}</h1>
      <label for="nome-jogador">Nome:</label><br>
      <input type="text" class="nome-jogador"><br>
      <label for="simbolo-jogador">Símbolo</label><br>
      <input type="text" class="simbolo-jogador" minlength="1" maxlength="1"><br>
      `
    
    return formulario;
  }

  function criarFormularioTabuleiro(idFormulario) {
    const formulario = document.createElement("form");
    formulario.setAttribute("id", idFormulario);
    formulario.innerHTML =
      `
      <h1>Tabuleiro</h1>
      <label for="dimensoes-tabuleiro">Dimensões:</label><br>
      <input type="number" id="dimensoes-tabuleiro" min="3"><br>
      `
    
    return formulario;
  }
}

const iniciarJogo = () => {
  const informacoesPrimeiroJogador = document.getElementById("primeiro-jogador");
  const informacoesSegundoJogador = document.getElementById("segundo-jogador");

  const primeiroJogador = {
    nome: informacoesPrimeiroJogador.querySelector(".nome-jogador").value, simbolo: informacoesPrimeiroJogador.querySelector(".simbolo-jogador").value
  };

  const segundoJogador = {
    nome: informacoesSegundoJogador.querySelector(".nome-jogador").value, simbolo: informacoesSegundoJogador.querySelector(".simbolo-jogador").value
  };

  const dimensoesTabuleiro = document.getElementById("dimensoes-tabuleiro").value;

  console.log("Jogador 1: ", primeiroJogador);
  console.log("Jogador 2: ", segundoJogador);

  console.log(`Dimensões do tabuleiro: ${dimensoesTabuleiro}x${dimensoesTabuleiro}`);
}