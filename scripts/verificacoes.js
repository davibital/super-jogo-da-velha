import { transpostaMatriz, tracoPrincipal, tracoSecundario, verificarCaracteresIguais, contarCharStr, removerCharStr } from './utils.js';

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
   * @param {String} simboloJogador - Símbolo que corresponde ao símbolo de um dos jogadores, considerando o primeiro que for encontrado na linha.
   * @returns Lista contendo os valores booleanos para cada linha, caso exista.
   */
  function linhaTemSimboloUnico(linha, coringa) {
    const strLinha = linha.reduce((acc, x) => acc + x, '')
    const tamanhoTabuleiro = linha.length
    
    const numeroSimbolosCoringas = contarCharStr(strLinha, coringa)
    const strLinhaTratado = removerCharStr(strLinha, coringa) 
    // A lógica do return aqui é a mesma da função anterior.
    if (numeroSimbolosCoringas !== 3) return (strLinhaTratado.length === (tamanhoTabuleiro - numeroSimbolosCoringas)) && verificarCaracteresIguais(strLinhaTratado)
    else return false
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
const verificarDiagonais = (tabuleiro, coringa) => {
  const tamanhoTabuleiro = tabuleiro.length
  // Esta função serve para verificar a diagonal principal do tabuleiro e retornar se a diagonal principal é "vencedora".
  const verificarDiagonalPrincipal = (tabuleiro, coringa) => {
    const strTracoPrincipal = tracoPrincipal(tabuleiro) // Calculamos o traço da matriz (tabuleiro)
    /* 
    A partir de agora faremos alguns tratamentos que são úteis para o tabuleiro grande, já que, quando o jogo empata, um símbolo coringa '?' aparece.
    Esse tratamento consiste em retirar o símbolo e modificar o método de verificação, de maneira que essa função continue sendo útil 
    tanto para o tabuleiro do jogo quanto para os jogos pequenos. 
    */
    // Número de ocorrência do símbolo coringa.
    const numeroSimbolosCoringas = contarCharStr(strTracoPrincipal, coringa) 
    // Retirando esses símbolos do Traço calculado.
    const strTracoPrincipalTratado = removerCharStr(strTracoPrincipal, coringa)
    if (numeroSimbolosCoringas !== 3) return (strTracoPrincipalTratado.length === (tamanhoTabuleiro - numeroSimbolosCoringas)) && verificarCaracteresIguais(strTracoPrincipalTratado)
    else return false

    /* 
    Verificamos se todos os quadrados estão preenchidos a partir da comparação com o tamanhoTabuleiro (length.tabuleiro).
    E depois com a função verificarCaracteresIguais() verificamos se todos os caracteres são iguais. 
    A partir da conjunção (&&) sabemos se a diagonal é "vencedora" ou não.

    Obs.: A operação de subtração entre tamanhoTabuleiro e numeroSimbolosCoringas faz com que a conjunção ignore a existência dessa mecânica
    e se ajuste para verificar se a diagonal no tabuleiro grande é vencedora.
    */ 
  }

  /* 
  Esta função serve para verificar a diagonal secundária do tabuleiro e retornar se a diagonal secundária é "vencedora".
  Sua lógica é a mesma que a função anterior.
  */
  const verificarDiagonalSecundaria = (tabuleiro, coringa) => {
    const strTracoSecundario = tracoSecundario(tabuleiro) // Calculamos o traço "secundário" da matriz (tabuleiro)
    const numeroSimbolosCoringas = contarCharStr(strTracoSecundario, coringa)
    const strTracoSecundarioTratado = removerCharStr(strTracoSecundario, coringa) 
    // A lógica do return aqui é a mesma da função anterior.
    if (numeroSimbolosCoringas !== 3) return (strTracoSecundarioTratado.length === (tamanhoTabuleiro - numeroSimbolosCoringas)) && verificarCaracteresIguais(strTracoSecundarioTratado)
    else return false
  }

  return verificarDiagonalPrincipal(tabuleiro, coringa) || verificarDiagonalSecundaria(tabuleiro, coringa)
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
const verificarVencedor = (tabuleiro, coringa = "?") => verificarLinhas(tabuleiro, coringa) || verificarColunas(tabuleiro, coringa) || verificarDiagonais(tabuleiro, coringa)

export { verificarVencedor }