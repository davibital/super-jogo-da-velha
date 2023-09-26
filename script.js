import { criarTabuleiro } from './utils.js'

const tabuleiroGrandeVazio = criarTabuleiro(3)(3)

const tabuleiroGrande = tabuleiroGrandeVazio.map(linha => linha.map(() => criarTabuleiro(3)(3)))

/**
 * Esta função é responsável pelo evento de clicar num botão. Ao clicar no botão, a função escreve na página um "X" ou "O" e atualiza a lista "tabuleiro".
 * @param {botao} botao - Botão da página que recebeu o clique
 * @param {turno} turno - Parâmetro que determina de quem é o turno na jogada, se é do "X" ou do "O".
 */
const clicarBotao = (botao, turno = 'O') => {

  // Obtendo a div em que o botão está localizado
  const elementoPai = botao.parentElement
  // Obtendo a localização do jogo em que foi feita a jogada, que se refere à posição do tabuleiro maior
  const linhaTabuleiroGrande = elementoPai.id[0]
  const colunaTabuleiroGrande = elementoPai.id[1]

  // Obtendo os índices do tabuleiro pequeno, onde de fato foi feita a jogada
  const linhaTabuleiroPequeno = botao.className[0]
  const colunaTabuleiroPequeno = botao.className[1]

  const tabuleiroPequeno = tabuleiroGrande[linhaTabuleiroGrande][colunaTabuleiroGrande]

  console.log("Linha do tabuleiro grande: ", linhaTabuleiroGrande)
  console.log("Coluna do tabuleiro grande: ", colunaTabuleiroGrande)
  console.log("Linha do tabuleiro pequeno: ", linhaTabuleiroPequeno)
  console.log("Coluna do tabuleiro pequeno: ", colunaTabuleiroPequeno)

  // Atualização da interface e também da matriz do tabuleiro pequeno
  botao.innerHTML = turno
  tabuleiroPequeno[linhaTabuleiroPequeno][colunaTabuleiroPequeno] = turno
  console.log(tabuleiroPequeno)

  // Aqui embaixo devem ocorrer as verificações para finalizar a jogada
}

// Adicionando a função de clique para todos os botões da página
const botoes = Array.from(document.querySelectorAll("button"))
botoes.map(botao => botao.addEventListener("click", () => clicarBotao(botao)))

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