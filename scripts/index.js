import { criarTabuleiro } from './utils.js';

// Esse arquivo possui todas as funções de manipulação da página HTML, trabalhando com DOM.

/**
 * Função para mostrar para o usuário um painel contendo as regras do jogo.
 */
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

/**
 * Função para remover as regras da tela do usuário e voltar para a tela anterior.
 */
const fecharRegras = () => {
  const painelJogo = document.getElementById("painel-jogo");
  const containerRegras = document.getElementById("container-regras");
  painelJogo.removeChild(containerRegras);

  const botoes = Array.from(painelJogo.querySelectorAll("h1"));
  botoes.map(botao => botao.removeAttribute("hidden"));
}

/**
 * Função para configurações do jogo, mostra para o usuário um formulário a ser preenchido, nesse formulário devem ser informados os nomes dos dois jogadores, os seus respectivos símbolos e as dimensões do tabuleiro do jogo.
 */
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
  botaoIniciar.addEventListener("click", evento => iniciarJogo(formularioPrimeiroJogador, formularioSegundoJogador, formularioTabuleiro));
  botaoIniciar.innerText = "Iniciar";
  
  configuracoesJogo.appendChild(formularioPrimeiroJogador);
  configuracoesJogo.appendChild(formularioSegundoJogador);
  configuracoesJogo.appendChild(formularioTabuleiro);
  configuracoesJogo.appendChild(botaoIniciar);
  
  painelJogo.appendChild(configuracoesJogo);
  
  /**
   * Função para criar o formulário do jogador, para que ele informe o seu nome e o seu símbolo.
   * @param {String} idFormulario - Id da tag form do HTML.
   * @param {Number} numeroJogador - Número do jogador que será apresentado na tela.
   * @returns {HTMLElement} tag form do HTML.
   */
  function criarFormularioJogador(idFormulario, numeroJogador) {
    const formulario = document.createElement("form");
    formulario.setAttribute("id", idFormulario);
    formulario.innerHTML =
      `
      <h1>Jogador ${numeroJogador}</h1>
      <label for="nome-jogador">Nome:</label><br>
      <input type="text" id="nome-jogador" minlength="3" maxlength="20" ><br> 
      <label for="simbolo-jogador">Símbolo</label><br>
      <input type="text" id="simbolo-jogador" minlength="1" maxlength="1"><br>
      `
    
    return formulario;
  }

  /**
   * Função para criar o formulário do tabuleiro, apenas contendo o campo de dimensões do tabuleiro
   * @param {String} idFormulario - Id da tag form do HTML
   * @returns {HTMLElement} tag form do HTML
   */
  function criarFormularioTabuleiro(idFormulario) {
    const formulario = document.createElement("form");
    formulario.setAttribute("id", idFormulario);
    formulario.innerHTML =
      `
      <h1>Tabuleiro</h1>
      <label for="dimensoes-tabuleiro">Dimensões:</label><br>
      <input type="number" id="dimensoes-tabuleiro" min="3" max="6"><br>
      `
    
    return formulario;
  }
}

/**
 * Função para iniciar o jogo com as configurações dos jogadores, assim como as configurações do tabuleiro.
 * @param {HTMLElement} formularioPrimeiroJogador - Form do HTML que representa os dados do primeiro jogador.
 * @param {HTMLElement} formularioSegundoJogador - Form do HTML que representa os dados do segundo jogador.
 * @param {HTMLElement} formularioTabuleiro - Form do HTML que representa os dados do tabuleiro.
 */
const iniciarJogo = (formularioPrimeiroJogador, formularioSegundoJogador, formularioTabuleiro) => {
  // Obtenção dos dados dos jogadores conforme informado no formulário
  const primeiroJogador = {
    nome: formularioPrimeiroJogador.querySelector("#nome-jogador").value,
    simbolo: formularioPrimeiroJogador.querySelector("#simbolo-jogador").value
  };

  const segundoJogador = {
    nome: formularioSegundoJogador.querySelector("#nome-jogador").value,
    simbolo: formularioSegundoJogador.querySelector("#simbolo-jogador").value
  };
 
  if (primeiroJogador.simbolo === segundoJogador.simbolo) {
    alert ('O símbolo do primeiro jogador não pode ser igual ao do segundo jogador!')
    formularioPrimeiroJogador.querySelector("#simbolo-jogador").value = '';
    formularioSegundoJogador.querySelector("#simbolo-jogador").value = '';
    location.reload();
     
  }
  const dimensoesTabuleiro = formularioTabuleiro.querySelector("#dimensoes-tabuleiro").value;

  // Criação da div principal que contém o conteúdo do jogo
  const conteudoJogo = 
  `
  <div id="lado-esquerdo">
    <div id="container-botao-voltar">
      <button>VOLTAR</button>
    </div>

    <h1>Jogador 1</h1>

    <div id="container-primeiro-jogador">
      <div id="nome-primeiro-jogador">${primeiroJogador.nome}</div>
      <div id="simbolo-primeiro-jogador">${primeiroJogador.simbolo}</div>
      <button>SORTEAR</button>
    </div>
  </div>

  <div id="conteudo-jogo">${criarTabuleiroGrande(dimensoesTabuleiro, dimensoesTabuleiro)}</div>
  
  <div id="lado-direito">
    <div id="container-botao-reiniciar">
      <button>REINICIAR</button>
    </div>

    <h1>Jogador 2</h1>

    <div id="container-segundo-jogador">
      <div id="nome-segundo-jogador">${segundoJogador.nome}</div>
      <div id="simbolo-segundo-jogador">${segundoJogador.simbolo}</div>
      <button>SORTEAR</button>
    </div>
  </div>
  `
  
  const painelJogo = document.getElementById("painel-jogo");
  painelJogo.innerHTML = conteudoJogo;

  // Adicionar código js correspondente à página do tabuleiro
  const novoScript = document.createElement("script");
  novoScript.setAttribute("src", "../scripts/main.js");
  novoScript.setAttribute("type", "module");
  document.body.appendChild(novoScript);

  /**
   * Função para criar o HTML do tabuleiro grande
   * @param {Number} linhas - Quantidade de linhas do tabuleiro
   * @param {Number} colunas - Quantidade de colunas do tabuleiro
   * @returns {String} String contendo o código HTML do tabuleiro grande
   */
  function criarTabuleiroGrande(linhas, colunas) {
    const divTabuleiroGrande =
      `<div class="grid-jogo">
        ${criarTabuleiroGrandeAux(linhas, colunas)}
       </div>
      `;
    
    return divTabuleiroGrande;

    /**
     * Função para criar os elementos do tabuleiro grande.
     * @param {Number} linhas - Quantidade de linhas do tabuleiro
     * @param {Number} colunas - Quantidade de colunas do tabuleiro
     * @returns {String} String contendo o código HTML dos elementos do tabuleiro grande
     */
    function criarTabuleiroGrandeAux(linhas, colunas) {
      // Criação de uma matrix de dimensões linhas x colunas
      const tabuleiro = criarTabuleiro(linhas)(colunas);

      // Aqui é feita a criação do tabuleiro grande, aplicando um reduce na matriz anterior e gerando uma string com o código HTML correspondente à div do tabuleiro grande
      const tabuleiroGrande =
        tabuleiro.reduce((acc, linha, indiceLinha) => acc +
          linha.reduce((acc, coluna, indiceColuna) =>
            // `
            //   ${acc}
            //   <div id="${indiceLinha}${indiceColuna}" class="grid-jogo-pequeno">
            //     ${criarTabuleiroPequeno(linhas, colunas)}
            //     <div class="vencedor coringa"></div>
            //   </div>
            // `,
            `
              ${acc}
              <div id="${indiceLinha}${indiceColuna}" class="grid-jogo-pequeno">
                ${criarTabuleiroPequeno(linhas, colunas)}
                <div class="vencedor"></div>
                <div class="coringa"></div>
              </div>
            `,
          ''),
        '');

      return tabuleiroGrande;
    }

    /**
     * Função para criar os elementos HTML do tabuleiro pequeno
     * @param {Number} linhas - Quantidade de linhas do tabuleiro
     * @param {Number} colunas - Quantidade de colunas do tabuleiro
     * @returns {String} String contendo o código HTML dos elementos do tabuleiro grande
     */
    function criarTabuleiroPequeno(linhas, colunas) {
      // Criação de uma matrix de dimensões linhas x colunas
      const tabuleiro = criarTabuleiro(linhas)(colunas);

      // Aqui é feita a criação do tabuleiro grande, aplicando um reduce na matriz anterior e gerando uma string com o código HTML correspondente ao tabuleiro pequeno.
      const tabuleirosPequenos =
        tabuleiro.reduce((acc, linha, indiceLinha) => acc +
          linha.reduce((acc, coluna, indiceColuna) =>
            `
              ${acc}
              <button class="${indiceLinha}${indiceColuna}"></button>
            `,
          ''),
        '');

      return tabuleirosPequenos;
    }
  }
}

const botaoJogar = document.getElementById("botao-jogar");
const botaoRegras = document.getElementById("botao-regras");
botaoJogar.addEventListener("click", configurarJogo);
botaoRegras.addEventListener("click", mostrarRegras);