// Cada uma destas listas representa um dos "Jogos da Velha Menores", cada elemento dessas listas será substituído por um X ou O a medida que o jogo ocorre.
const jogo0 = ['','','','','','','','','']
const jogo1 = ['','','','','','','','','']
const jogo2 = ['','','','','','','','','']
const jogo3 = ['','','','','','','','','']
const jogo4 = ['','','','','','','','','']
const jogo5 = ['','','','','','','','','']
const jogo6 = ['','','','','','','','','']
const jogo7 = ['','','','','','','','','']
const jogo8 = ['','','','','','','','','']

// Esta lista de listas representa o "Tabuleiro" do jogo. À medida que os eventos acontecem, a lista vai sendo atualizada
const tabuleiro = [jogo0, jogo1, jogo2, jogo3, jogo4, jogo5, jogo6, jogo7, jogo8]

/**
 * Esta função é responsável pelo evento de clicar num botão. Ao clicar no botão, a função escreve na página um "X" ou "O" e atualiza a lista "tabuleiro".
 * @param {id} id - Índice (ou posição) do botão na página. 
 * @param {turno} turno - Parâmetro que determina de quem é o turno na jogada, se é do "X" ou do "O".
 */
const clicarBotao = (id, turno = 'O') => {
  const idJogo = parseInt(id.charAt(0))
  const idQuadrado = parseInt(id.charAt(1))
  
  tabuleiro[idJogo][idQuadrado] = turno
  document.getElementById(id).innerHTML = turno
  console.log(jogo0, jogo1, jogo2, jogo3, jogo4, jogo5, jogo6, jogo7, jogo8)
}

/**
 * Esta função serve para verificar as linhas do tabuleiro e retornar se existe alguma linha vencedora, ou seja, alguma linha completa com um único símbolo X ou O.
 * @param {tabuleiro} tabuleiro - Matriz de duas dimensões, correspondente ao tabuleiro do jogo.
 * @returns Registro contendo o índice da linha vencedora e o símbolo vencedor, caso não exista vencedor, os valores desses campos serão igual a false.
 */
const verificarLinhas = ([...tabuleiro]) => {
  const simboloUnicoPorLinha = tabuleiro.map(linha => linhaPossuiSimboloUnico(linha))

  return linhaESimboloVencedor(simboloUnicoPorLinha)

  /**
   * Esta função serve para verificar se a linha possui algum símbolo único.
   * @param {linha} linha - Lista contendo os símbolos jogados na linha.
   * @returns Lista contendo os símbolos únicos de cada linha, caso não exista símbolo único na linha, o símbolo é vazio('').
   */
  function linhaPossuiSimboloUnico(linha) {
    return linha.reduce((simboloAnterior, simbolo, indice) => {
      if (indice == 0)
        return simbolo
      else if (simbolo == simboloAnterior)
        return simbolo
      else return ''
    }, '')
  }

  /**
   * Esta função tem como objetivo percorrer uma lista e retornar um registro contendo o símbolo vencedor e o índice da linha correspondente
   * @param {*} simbolosUnicos - Lista contendo os símbolos únicos de cada linha.
   * @param {*} indice - Índice da linha correspondente, seu valor inicial é igual a 0.
   * @returns Registro contendo o índice da linha vencedora e o símbolo vencedor, caso não exista vencedor, os valores desses campos serão igual a false. 
   */
  function linhaESimboloVencedor([simbolo, ...simbolosUnicos], indice = 0) {
    if (simbolo == 'X' || simbolo == 'O')
      return { linha: indice, simbolo: simbolo }
    else if (simbolosUnicos.length == 0)
      return { linha: false, simbolo: false }
    else
      return linhaESimboloVencedor(simbolosUnicos, indice + 1)
  }
}

//console.log(verificarLinhas(tabuleiro))