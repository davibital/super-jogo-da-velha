import * as utils from './utils.js';

/**
 * Esta função serve para verificar as linhas do tabuleiro e retornar se existe alguma linha vencedora, ou seja, alguma linha completa com um único símbolo X ou O.
 * @param {tabuleiro} tabuleiro - Matriz de duas dimensões, correspondente ao tabuleiro do jogo.
 * @returns Valor booleano que indica se existe alguma linha ganhadora, ou seja, uma linha com todos os elementos iguais, desconsiderando o elemento vazio.
 */
const verificarLinhas = ([...tabuleiro]) => {

  const existeLinhaGanhadora = tabuleiro.reduce((estadoLinha, linha) => {
    if (linhaTemSimboloUnico(linha)) {
      estadoLinha = true
    }
    return estadoLinha
  }, false)

  return existeLinhaGanhadora

  /**
   * Esta função serve para verificar se a linha possui algum símbolo único.
   * @param {linha} linha - Lista contendo os símbolos jogados na linha.
   * @returns Lista contendo os valores booleanos para cada linha, caso exista.
   */
  function linhaTemSimboloUnico([simbolo, ...linha]) {
    if (linha.length == 0)
      return true
    if (simbolo == '')
      return false
    else {
      const proximoSimbolo = linha[0]
      if (simbolo != proximoSimbolo)
        return false
      else
        return linhaTemSimboloUnico(linha)
    }
  }
}

const verificarColunas = (tabuleiro) => {
  const tabuleiroTransposto = utils.transpostaMatriz(tabuleiro)
  return verificarLinhas(tabuleiroTransposto)
}

const verificarDiagonais = (tabuleiro) => {
  const tamanhoTabuleiro = tabuleiro.length

  const verificarDiagonalPrincipal = (tabuleiro) => {
    const strTracoPrincipal = utils.tracoPrincipal(tabuleiro)
    return (strTracoPrincipal.length === tamanhoTabuleiro) && utils.verificarCaracteresIguais(strTracoPrincipal)
  }
  const verificarDiagonalSecundaria = (tabuleiro) => {
    const strTracoSecundario = utils.tracoSecundario(tabuleiro)
    return (strTracoSecundario.length === tamanhoTabuleiro) && utils.verificarCaracteresIguais(strTracoSecundario)
  }

  return verificarDiagonalPrincipal(tabuleiro) || verificarDiagonalSecundaria(tabuleiro)
}

const verificarVencedor = (tabuleiro) => verificarLinhas(tabuleiro) || verificarColunas(tabuleiro) || verificarDiagonais(tabuleiro)

export { verificarVencedor }