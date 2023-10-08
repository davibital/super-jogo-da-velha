import { passarVez } from "./actions.js";

/**
 * Função para inserir o símbolo em alguma casa que esteja desocupada.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 */
const inserirSimbolo = (sequenciaTurnos) => (simbolo) => (tabuleiro, linha, coluna) => {
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
   * @param {Array} tabuleiro - Matriz que representa o tabuleiro jogado.
   * @param {Number} linha - Índice da linha do tabuleiro.
   * @param {Number} coluna - Índice da coluna do tabuleiro.
   * @returns 
   */
  const alternarSimboloAux = (simbolo) => (tabuleiro, linha, coluna) => {
    if (tabuleiro[linha][coluna] == simbolo) return false;

    tabuleiro[linha][coluna] = simbolo;

    return true;
  }

  return alternarSimboloAux;
}

const perderAVez = (sequenciaTurnos) => {
  alert("Infelizmente você perdeu a vez!");
  passarVez(sequenciaTurnos);

  return false;
}

const listaPoderes = [inserirSimbolo, alternarSimbolo, perderAVez, perderAVez, perderAVez, perderAVez];

/**
 * Função para sortear o poder do jogador e atribuir o poder a ele.
 * @param {Array} listaJogadores - Lista contendo as informações dos dois jogadores.
 */
const sortearPoder = (listaJogadores, sequenciaTurnos, poderes = listaPoderes) => (evento) => {
  const botao = evento.srcElement;

  const elementoPai = botao.parentElement;

  const jogador = elementoPai.id.split("-")[1];
  const indiceJogador = jogador == "primeiro" ? 0 : 1;

  // Sorteando o índice do poder do 1 até o último índice da lista de poderes, exlcuindo o primeiro índice pois é a ação padrão.
  const indicePoder = Math.floor(Math.random() * (listaPoderes.length - 1) ) + 1;

  const poderSorteado = poderes[indicePoder];

  listaJogadores[indiceJogador].poder = poderSorteado(sequenciaTurnos);

  if (indicePoder >= 2)
    listaJogadores[indiceJogador].poder = poderes[0](sequenciaTurnos);
}

export { sortearPoder, listaPoderes };