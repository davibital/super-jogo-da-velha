import { passarVez } from "./actions.js";
import * as utils from './utils.js';
import { embaralharMatriz, randint } from './random.js';
import { tabuleiroGrande} from './main.js';

const embaralharJogoPequeno = (linhaJogoPequeno, colunaJogoPequeno) => {
  const jogoPequenoJS = tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno]
  const jogoPequenoJSEmbaralhado = embaralharMatriz(jogoPequenoJS)

  tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno] = jogoPequenoJSEmbaralhado
}

const embaralharJogoPequenoAleatorio = () => {
  const indexLinhaAleatorio = randint(0, tabuleiroGrande.length - 1)
  const indexColunaAleatorio = randint(0, tabuleiroGrande.length - 1)

  const jogoSorteado = tabuleiroGrande[indexLinhaAleatorio][indexColunaAleatorio]
  if (Array.isArray(jogoSorteado)) return embaralharJogoPequeno(indexLinhaAleatorio, indexColunaAleatorio)
  else return embaralharJogoPequenoAleatorio()
}

const embaralharTabuleiro = () => {
  tabuleiroGrande.map((linhaGrande, indexLinhaJogo) => {
    linhaGrande.map((jogoPequeno, indexColunaJogo) => {
      if (Array.isArray(jogoPequeno)) return embaralharJogoPequeno(indexLinhaJogo, indexColunaJogo)
    })
  })
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
   * @param {String} simbolo - Símbolo utilizado pelo jogador.
   * @param {Array} tabuleiro - Matriz que representa o tabuleiro jogado.
   * @param {Number} linha - Índice da linha do tabuleiro.
   * @param {Number} coluna - Índice da coluna do tabuleiro.
   * @returns {Boolean} Valor booleano para indicar se a ação foi bem sucedida ou não.
   */
  const alternarSimboloAux = (simbolo) => (tabuleiro, linha, coluna) => {
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

  return false;
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
    const tamanhoListaPassarVez = ((100 - probabilidade)/probabilidade) * poderes.length 
    return [...poderes, ...utils.criarListaElementosIguais(perderAVez, tamanhoListaPassarVez)]
  }
}

const poderes = [inserirSimbolo, alternarSimbolo]
const listaPoderes = criarListaPoderes(poderes, 50)

/**
 * Função para sortear o poder do jogador e atribuir o poder a ele.
 * @param {Array} listaJogadores - Lista contendo as informações dos dois jogadores.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
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

  // Reatribuição do poder do jogador caso tenha perdido a vez, retorna para a ação padrão.
  if (indicePoder >= 2)
    listaJogadores[indiceJogador].poder = poderes[0](sequenciaTurnos);
}

export { sortearPoder, listaPoderes };