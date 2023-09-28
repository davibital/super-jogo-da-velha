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

  // Atualização da interface e também da matriz do tabuleiro pequeno
  botao.innerHTML = turno
  tabuleiroPequeno[linhaTabuleiroPequeno][colunaTabuleiroPequeno] = turno

  // Aqui embaixo devem ocorrer as verificações para finalizar a jogada
  verificarLinhas(tabuleiroPequeno)
}

// Adicionando a função de clique para todos os botões da página
const botoes = Array.from(document.querySelectorAll("button"))
botoes.map(botao => botao.addEventListener("click", () => clicarBotao(botao)))

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

//console.log(verificarLinhas(tabuleiro))