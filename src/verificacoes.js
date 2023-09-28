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

  console.log(existeLinhaGanhadora)

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

export {verificarLinhas, verificarCaracteresIguais }