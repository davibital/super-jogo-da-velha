import { passarVez, atualizarTabuleiroHTML } from "./actions.js";
import * as utils from './utils.js';
import { sortearPoderJogadores, tabuleiroGrande } from "./main.js"; 
import * as random from './random.js';
import { removerAcaoBotoes } from "./jogar.js";

/**
 * Esta função serve para embaralhar um Jogo Pequeno.
 * Ela é uma função de apoio para as funções definidas adiante embaralharJogoPequenoAleatorio() e embaralharTabuleiro()
 * @param {*} linhaJogoPequeno - Representa a linha do Jogo Pequeno que será embaralhado.
 * @param {*} colunaJogoPequeno - Representa a coluna do Jogo Pequeno que será embaralhado.
 */
const embaralharJogoPequeno = (linhaJogoPequeno, colunaJogoPequeno) => {
  const jogoPequenoJS = tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno]
  const jogoPequenoJSEmbaralhado = random.embaralharMatriz(jogoPequenoJS)

  tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno] = jogoPequenoJSEmbaralhado
}

/**
 * Esta função escolhe um Jogo Pequeno aleatório e tenta embaralhar ele. Caso esse jogo já tenha sido finalidado, ou seja,
 * algum jogador ganhou ou houve empate, um alerta é imprimido falando que dessa vez o sorteado não estava disponível e você perde a vez.
 */
const embaralharJogoPequenoClique = () => {
  alert("Você ganhou a função de embaralhar um jogo pequeno!");
  const embaralharAux = (simbolo) => (tabuleiro, linha, coluna) => (elementoPai) => {
    tabuleiro = random.embaralharMatriz(tabuleiro)
    
    // Obtém as coordenadas do Jogo da Velha pequeno onde a jogada foi efetuada.
    const linhaGrande = elementoPai.id[0];
    const colunaGrande = elementoPai.id[1];
    
    tabuleiroGrande[linhaGrande][colunaGrande] = tabuleiro

    atualizarTabuleiroHTML()
    return true
  }
  return embaralharAux
}

/**
 * Esta função embaralha cada jogo pequeno do tabuleiro totalmente. O único critério é que um jogo finalizado não é alterado.
 */
const embaralharTabuleiro = () => {
  alert("O tabuleiro foi totalmente embaralhado! Será que isso foi bom ou ruim? Veremos!");

  tabuleiroGrande.map((linhaGrande, indexLinhaJogo) => {
    linhaGrande.map((jogoPequeno, indexColunaJogo) => {
      if (Array.isArray(jogoPequeno)) return embaralharJogoPequeno(indexLinhaJogo, indexColunaJogo)
    })
  })

  atualizarTabuleiroHTML();

  return true;
}

/**
 * Função para inserir o símbolo em alguma casa que esteja desocupada.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 * @param {String} simbolo - Símbolo utilizado pelo jogador.
 * @param {Array} tabuleiro - Matriz que representa o tabuleiro jogado.
  * @param {Number} linha - Índice da linha do tabuleiro.
  * @param {Number} coluna - Índice da coluna do tabuleiro.
  * @returns {Boolean} Valor booleano para indicar se a ação foi bem sucedida ou não.
 */
const inserirSimbolo = (sequenciaTurnos) => (simbolo) => (tabuleiro, linha, coluna) => () => {
  if (tabuleiro[linha][coluna] != '') return false

  tabuleiro[linha][coluna] = simbolo;

  return true;
}

/**
 * Função para alternar o símbolo de alguma casa do tabuleiro pequeno que já foi ocupada.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 * @returns {Function} - Função responsável por alternar o símbolo do oponente
 */
const alternarSimbolo = (sequenciaTurnos) => {
  alert("Você ganhou a função de alternar o símbolo de alguma casa ocupada pelo oponente!");

  /**
   * Função auxiliar para alternar o símbolo de alguma casa do tabuleiro pequeno que já foi ocupada.
   * @param {String} simbolo - Símbolo utilizado pelo jogador.
   * @param {Array} tabuleiro - Matriz que representa o tabuleiro jogado.
   * @param {Number} linha - Índice da linha do tabuleiro.
   * @param {Number} coluna - Índice da coluna do tabuleiro.
   * @returns {Boolean} Valor booleano para indicar se a ação foi bem sucedida ou não.
   */
  const alternarSimboloAux = (simbolo) => (tabuleiro, linha, coluna) => () => {
    if (tabuleiro[linha][coluna] == simbolo) return false;

    tabuleiro[linha][coluna] = simbolo;

    return true;
  }

  return alternarSimboloAux;
}

/**
 * Função para passar a vez para o próximo devido ao sorteio do poder.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 * @returns {Boolean} Valor booleano para indicar se a ação foi bem sucedida ou não.
 */
const perderAVez = (sequenciaTurnos) => {
  alert("Infelizmente você perdeu a vez!");
  passarVez(sequenciaTurnos);
}

/**
 * Esta função vai gerar uma lista com os poderes e as "punições" (que seria perder a vez).
 * @param {Array} poderes - Lista com os poderes definidos
 * @param {Number} probabilidade - Probabilidade de um poder ser sorteado. (Aceita apenas valores múltiplos como 0%, 10%, 20%, ...)
 * @returns {Array} - retorna uma lista que possui todos os poderes definidos e um número determinado de instâncias da função passarVez().
 */
const criarListaPoderes = (poderes, probabilidade) => {
  // Caso seja 0%, você está "desativando" a mecânica, quem clicar nesse botão apenas perderá a vez
  if (probabilidade === 0) return [passarVez]
  else {
    const tamanhoListaPassarVez = ((100 - probabilidade)/probabilidade) * (poderes.length - 1) // o '-1' retira a função inserirSimbolo da lógica, já que não consiste em um poder
    return [...poderes, ...utils.criarListaElementosIguais(perderAVez, tamanhoListaPassarVez)]
  }
}

const poderes = [inserirSimbolo, embaralharJogoPequenoClique, alternarSimbolo, embaralharTabuleiro]
const listaPoderes = criarListaPoderes(poderes, 50)

/**
 * Função para sortear o poder do jogador e atribuir o poder a ele.
 * @param {Array} listaJogadores - Lista contendo as informações dos dois jogadores.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 */
const sortearPoder = (listaJogadores, sequenciaTurnos, poderes = listaPoderes) => (evento) => {
  const botao = evento.srcElement;

  const elementoPai = botao.parentElement;

  const jogador = listaJogadores.reduce((jogadorAtual, jogador) => {
    const nomeJogador = elementoPai.querySelector(".nome").innerHTML;

    if (jogador.nome == nomeJogador) jogadorAtual = jogador;

    return jogadorAtual;
  });

  // Sorteando o índice do poder do 1 até o último índice da lista de poderes, exlcuindo o primeiro índice pois é a ação padrão.
  const indicePoder = Math.floor(Math.random() * (listaPoderes.length - 1)) + 1;

  const poderSorteado = poderes[indicePoder];

  jogador.poder = poderSorteado(sequenciaTurnos);

  // Reatribuição do poder do jogador caso tenha perdido a vez, retorna para a ação padrão.
  if (indicePoder >= 3)
    jogador.poder = poderes[0](sequenciaTurnos);
  // Removendo a ação do botão caso o poder não seja o de perder a vez
  if (indicePoder <= 3)
    removerAcaoBotoes(sortearPoderJogadores);
}

export { sortearPoder, listaPoderes };
