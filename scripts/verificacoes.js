import { transpostaMatriz, tracoPrincipal, tracoSecundario, verificarCaracteresIguais } from './utils.js';

/**
 * Esta função serve para verificar as linhas do tabuleiro e retornar se existe alguma linha vencedora, ou seja, alguma linha completa com um único símbolo X ou O.
 * @param {Array} tabuleiro - Matriz de duas dimensões, correspondente ao tabuleiro do jogo.
 * @param {String} coringa - Símbolo que corresponde ao símbolo coringa do jogo.
 * @returns {Boolean} - Valor booleano que indica se existe alguma linha vencedora, ou seja, uma linha com todos os elementos iguais, desconsiderando o elemento vazio.
 */
const verificarLinhas = ([...tabuleiro], coringa) => {
  const existeLinhaGanhadora = tabuleiro.reduce((estadoLinha, linha) => {
    if (linhaTemSimboloUnico(linha, coringa)) {
      estadoLinha = true
    }
    return estadoLinha
  }, false)

  return existeLinhaGanhadora

  /**
   * Esta função serve para verificar se a linha possui algum símbolo único.
   * @param {Array} linha - Lista contendo os símbolos jogados na linha.
   * @param {String} coringa - Símbolo que corresponde ao símbolo coringa do jogo.
   * @returns Lista contendo os valores booleanos para cada linha, caso exista.
   */
  function linhaTemSimboloUnico([simbolo, ...linha], coringa) {
    if (typeof simbolo != 'string' || simbolo == '')
      return false
    if (linha.length == 0)
      return true
    if (simbolo == coringa)
      return linhaTemSimboloUnico(linha, coringa)
    else {
      const proximoSimbolo = linha[0]
      if (simbolo != proximoSimbolo && proximoSimbolo != coringa)
        return false
      else
        return linhaTemSimboloUnico(linha, coringa)
    }
  }
}
/**
 * Esta função serve para verificar as colunas do tabuleiro e retornar se existe alguma coluna vencedora.
 * Isso é feito a partir do reuso da função verificarLinhas() que só é possível pois fazemos antes a transposição do tabuleiro (transformar as colunas em linhas).
 * @param {Array} tabuleiro - Matriz de duas dimensões, correspondente ao tabuleiro do jogo.
 * @param {String} coringa - Símbolo que corresponde ao símbolo coringa do jogo.
 * @returns {Boolean} - Valor booleano que indica se existe alguma coluna vencedora, ou seja, uma coluna com todos os elementos iguais, desconsiderando o elemento vazio.
 */
const verificarColunas = (tabuleiro, coringa) => {
  const tabuleiroTransposto = transpostaMatriz(tabuleiro)
  return verificarLinhas(tabuleiroTransposto, coringa)
}

/**
 * Esta função serve para verificar as diagonais do tabuleiro e retornar se existe alguma diagonal "vencedora".
 * A função verificarDiagonais() é composta por duas outras funções verificarDiagonalPrincipal() e verificarDiagonalSecundaria().
 * @param {Array} tabuleiro - Matriz de duas dimensões, correspondente ao tabuleiro do jogo.
 * @returns {Boolean} Valor booleano que indica se existe alguma diagonal vencedora, ou seja, uma coluna com todos os elementos iguais, desconsiderando o elemento vazio.
 */
const verificarDiagonais = (tabuleiro) => {
  const tamanhoTabuleiro = tabuleiro.length
  // Esta função serve para verificar a diagonal principal do tabuleiro e retornar se a diagonal principal é "vencedora".
  const verificarDiagonalPrincipal = (tabuleiro) => {
    const strTracoPrincipal = tracoPrincipal(tabuleiro) // Calculamos o traço da matriz (tabuleiro)
    return (strTracoPrincipal.length === tamanhoTabuleiro) && verificarCaracteresIguais(strTracoPrincipal) 
    /* 
    Verificamos se todos os quadrados estão preenchidos a partir da comparação com o tamanhoTabuleiro (length.tabuleiro).
    E depois com a função verificarCaracteresIguais() verificamos se todos os caracteres são iguais. 
    A partir da conjunção (&&) sabemos se a diagonal é "vencedora" ou não.
    */ 
  }

  // Esta função serve para verificar a diagonal secundária do tabuleiro e retornar se a diagonal secundária é "vencedora".
  const verificarDiagonalSecundaria = (tabuleiro) => {
    const strTracoSecundario = tracoSecundario(tabuleiro) // Calculamos o traço "secundário" da matriz (tabuleiro)
    return (strTracoSecundario.length === tamanhoTabuleiro) && verificarCaracteresIguais(strTracoSecundario)
    // A lógica do return aqui é a mesma da função anterior.
  }

  return verificarDiagonalPrincipal(tabuleiro) || verificarDiagonalSecundaria(tabuleiro)
  // E, a partir da disjunção (||), é possível verificar se alguma diagonal é "vencedora".
}

/**
 * Esta função serve para verificar TODO tabuleiro e retornar se aquele tabuleiro há vencedor ou não.
 * A função verificarVencedor() é uma composição, a partir de disjunções (||), das funções anteriores 
 * que verificam, individualmente, linhas, colunas e diagonais.
 * @param {Array} tabuleiro - Matriz de duas dimensões, correspondente ao tabuleiro do jogo.
 * @param {String} coringa - Símbolo que corresponde ao símbolo coringa do jogo.
 * @returns {Boolean} - Valor booleano que indica se há vencedor.
 */
const verificarVencedor = (tabuleiro, coringa = "?") => verificarLinhas(tabuleiro, coringa) || verificarColunas(tabuleiro, coringa) || verificarDiagonais(tabuleiro)

export { verificarVencedor }