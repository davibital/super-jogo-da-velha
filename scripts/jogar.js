import { criarTabuleiro } from './utils.js'

/**
 * Função para remover a ação de clique dos botões.
 * @param {Function} funcao - Função que deseja retirar dos botões.
 */
const removerAcaoBotoes = (funcao) => {
  const botoes = Array.from(document.querySelectorAll("button"));

  botoes.map(botao => botao.removeEventListener("click", funcao));
}

/**
 * Função para retornar à página inicial.
 */
const voltarAoInicio = (evento) => {
  localStorage.clear();
  window.location.href = './index.html';
}

/**
 * Função para reiniciar a página. 
 */
const reiniciar = (evento) => { window.location.reload() };

/**
 * Função para preencher a página HTML com as informações dos jogadores.
 * @param {Registro} informacoesPrimeiroJogador - Registro contendo o nome e o símbolo do primeiro jogador.
 * @param {Registro} informacoesSegundoJogador - Registro contendo o nome e o símbolo do segundo jogador.
 */
const preencherInformacoesJogadores = (informacoesPrimeiroJogador, informacoesSegundoJogador) => {
  const containerPrimeiroJogador = document.getElementById("container-primeiro-jogador");
  const containerSegundoJogaodr = document.getElementById("container-segundo-jogador");

  containerPrimeiroJogador.querySelector(".nome").innerHTML = informacoesPrimeiroJogador.nome;
  containerPrimeiroJogador.querySelector(".simbolo").innerHTML = informacoesPrimeiroJogador.simbolo;

  containerSegundoJogaodr.querySelector(".nome").innerHTML = informacoesSegundoJogador.nome;
  containerSegundoJogaodr.querySelector(".simbolo").innerHTML = informacoesSegundoJogador.simbolo;
}

/**
 * Função para desenhar o tabuleiro da página, baseado nas dimensões fornecidas pelo usuário.
 * @param {Number} dimensoesTabuleiro - Número inteiro que corresponde a quantidade de linhas e de colunas do tabuleiro.
 */
const desenharTabuleiro = (dimensoesTabuleiro) => {
  const conteudoJogo = document.getElementById("conteudo-jogo");

  conteudoJogo.innerHTML = criarTabuleiroGrande(dimensoesTabuleiro, dimensoesTabuleiro);

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

const primeiroJogador = {
  nome: localStorage.getItem("nomePrimeiroJogador"),
  simbolo: localStorage.getItem("simboloPrimeiroJogador")
}

const segundoJogador = {
  nome: localStorage.getItem("nomeSegundoJogador"),
  simbolo: localStorage.getItem("simboloSegundoJogador")
}

const dimensoesTabuleiro = parseInt(localStorage.getItem("dimensoesTabuleiro"));

const botaoVoltar = document.getElementById("botao-voltar");
const botaoReiniciar = document.getElementById("botao-reiniciar");

botaoVoltar.addEventListener("click", voltarAoInicio);
botaoReiniciar.addEventListener("click", reiniciar);

preencherInformacoesJogadores(primeiroJogador, segundoJogador);
desenharTabuleiro(dimensoesTabuleiro);

// Adicionar código js correspondente à página do tabuleiro
const novoScript = document.createElement("script");
novoScript.setAttribute("src", "../scripts/main.js");
novoScript.setAttribute("type", "module");
document.body.appendChild(novoScript);

export { removerAcaoBotoes };