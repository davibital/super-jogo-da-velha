/**
 * Esta função serve para criar um tabuleiro (Jogo da Velha) de tamanho determinado.
 * @param {Number} linhas - Número de linhas.
 * @param {Number} colunas - Número de colunas.
 * @returns {Array} - Retorna uma matriz cujos elementos são strings vazias (''). 
 */
const criarTabuleiro = (linhas) => (colunas) => {
  if (linhas == 0)
    return []
  else
    return [criarLinha(colunas), ...criarTabuleiro(linhas - 1)(colunas)]
  
  function criarLinha(colunas) {
    if (colunas == 0)
      return []
    else
      return ['', ...criarLinha(colunas - 1)]
  }
}

/**
 * Esta função serve para calcular a transposta de uma matriz, ou seja, transformar linhas em colunas.
 * Ela é útil já que estamos considerando o tabuleiro de jogo como uma matriz quadrada.
 * @param {Array} matriz - Matriz de duas dimensões.
 * @returns {Array} - A transposta da matriz de entrada.
 */
const transpostaMatriz = (matriz) => {
  const transformarColunaEmLinha = (matriz, coluna) => matriz.map((linha) => linha[coluna])
  const transpostaAux = (matriz, coluna = 0) => {
    if (coluna > matriz.length - 1) return []
    else return [transformarColunaEmLinha(matriz, coluna), ...transpostaAux(matriz, coluna += 1)]
  }
  return transpostaAux(matriz)
}

/**
 * Esta função serve para calcular o traço de uma matriz, ou seja, a soma dos elementos presentes na diagonal principal.
 * Outro recurso da Álgebra Linear que será útil para as funções presentes no arquivo "verificacoes.js".
 * @param {Array} matriz - Matriz de duas dimensões. (Os elementos dessa matriz são/devem ser strings)
 * @returns {String} - Uma string que consiste no traço da matriz de entrada.
 */
const tracoPrincipal = (matriz) => {
  const tracoAux = ([x, ...xs], coluna = 0) => {
    if (typeof x == "undefined") return ''
    else return x[coluna] + tracoAux(xs, coluna += 1)
  }
  return tracoAux(matriz)
}
/**
 * Na Álgebra Linear, não existe uma definição de traço para a diagonal secundária. 
 * Porém, estamos definindo um conceito de traço para essa diagonal, já que será útil para as verificações.
 * Esta função serve para calcular o traço "secundário" de uma matriz, ou seja, a soma dos elementos presentes na diagonal secundária.
 * @param {Array} matriz - Matriz de duas dimensões. (Os elementos dessa matriz são/devem ser strings)
 * @returns {String} - Uma string que consiste no traço "secundário" da matriz de entrada.
 */
const tracoSecundario = (matriz) => {
  const tracoAux = ([x, ...xs], coluna = matriz.length - 1) => {
    if (typeof x == "undefined") return ''
    else return x[coluna] + tracoAux(xs, coluna -= 1)
  }
  return tracoAux(matriz)
}

/**
 * Esta função serve para verificar se todos os caracteres de uma string são iguais.
 * @param {String} str - Uma string (conjunto de caracteres).
 * @returns {Boolean} - Valor booleano que indica se todos os caracteres são iguais ou não.
 */
const verificarCaracteresIguais = (str) => {
  const verificarAux = (str, acc = 0) => {
    const x = str[acc] // A constante 'x' é o caractere na posição 'acc' na string.
    const y = str[acc+1] // A constante 'y' é o caractere que ocupado uma posição a frente do caractere armazenado em 'x'.
    if (typeof x == "undefined") return true // Esse caso base retorna true quando a string de entrada é vazia.
    else if (typeof y == "undefined") return true // Quando a string de entrada tem apenas um caractere, retorna true. Esse caso base é o caso que dá o stop na recursão. 
    else return (x === y) && verificarAux(str, acc += 1) // Fórmula Recursiva
  }
  return verificarAux(str)
}

/**
 * Esta função serve para desaninhar uma lista que possui lista(s) como elemento(s).
 * @param {Array} lista - Uma lista "aninhada", ou seja, que possui lista(s) como elemento(s).
 * @returns {Array} - Uma única lista que possui todos os elementos presentes nas lista(s) "internas".
 */
const desaninhar = ([x, ...xs]) => {
  if (typeof x == "undefined") return []
  else return [...x, ...desaninhar(xs)]
}

/**
 * Esta função serve para aninhar uma lista em listas com um tamanho determinado (o parâmetro de entrada "tamanhoListas").
 * @param {Array} lista - Uma lista qualquer. 
 * @param {Number} tamanhoListas - O tamanho das listas "internas" que serão geradas (caso possível).
 * @returns {Array} - Uma única lista aninhada que possui os elementos dentro de outras listas.
 */
const aninhar = (lista, tamanhoListas) => {
  if (lista.length === 0) return []
  else return [lista.slice(0, tamanhoListas), ...aninhar(lista.slice(tamanhoListas), tamanhoListas)]
} 

/**
 * Esta função serve para remover uma ação relacionada ao clique de um botão.
 * @param {Array} listaBotoes - Lista com os botões presentes no HTML.
 * @param {Function} funcao - Função que será removida.
 */
const removerAcaoBotoes = (listaBotoes, funcao) => {
  listaBotoes.map(botao => botao.removeEventListener("click", funcao))
}

/**
 * Esta função serve para sortear o primeiro jogador a jogar.
 * @param {Array} listaJogadores - Lista contendo os registros dos jogadores, com nome e o seu respectivo símbolo
 * @returns {Array} - Uma sequência com os símbolos dos jogadores participantes do jogo
 */
const gerarSequenciaTurnos = (listaJogadores) => {
  const numeroJogadores = listaJogadores.length;
  const jogadorComeca = Math.floor(Math.random() * numeroJogadores);
  const primeiroJogador = listaJogadores[jogadorComeca];
  const restoJogadores = listaJogadores.filter((jogador, indice) => indice != jogadorComeca);

  const sequenciaSimbolos = [primeiroJogador.simbolo, ...restoJogadores.map(jogador => jogador.simbolo)]

  return sequenciaSimbolos;
}

export { criarTabuleiro, transpostaMatriz, tracoPrincipal, tracoSecundario, verificarCaracteresIguais, desaninhar, aninhar, removerAcaoBotoes, gerarSequenciaTurnos }