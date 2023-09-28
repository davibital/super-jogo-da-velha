import { criarTabuleiro, removerAcaoBotoes } from './utils.js'
import { verificarLinhas, verificarCaracteresIguais } from './verificacoes.js'

const tabuleiroGrandeVazio = criarTabuleiro(3)(3)

const tabuleiroGrande = tabuleiroGrandeVazio.map(linha => linha.map(() => criarTabuleiro(3)(3)))

/**
 * Esta função é responsável pelo evento de clicar num botão. Ao clicar no botão, a função escreve na página um "X" ou "O" e atualiza a lista "tabuleiro".
 * @param {botao} botao - Botão da página que recebeu o clique
 * @param {turno} turno - Parâmetro que determina de quem é o turno na jogada, se é do "X" ou do "O".
 */
const clicarBotao = (eventoClique, turno = 'O') => {
  // Obtendo o botão que foi acionado
  const botao = eventoClique.srcElement

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
  tabuleiroPequeno[linhaTabuleiroPequeno][colunaTabuleiroPequeno] = turno
  botao.innerHTML = turno
  // Removendo ação de clique do botão
  botao.removeEventListener("click", clicarBotao)

  // Aqui embaixo devem ocorrer as verificações para finalizar a jogada
  if (verificarLinhas(tabuleiroPequeno)) {
    tabuleiroGrande[linhaTabuleiroGrande][colunaTabuleiroGrande] = turno
    const listaBotoes = Array.from(elementoPai.querySelectorAll("button"))
    removerAcaoBotoes(listaBotoes, clicarBotao)
    // elementoPai.innerHTML += `<p>${turno}</p>`
  }
}

// Adicionando a função de clique para todos os botões da página
const botoes = Array.from(document.querySelectorAll("button"))
botoes.map(botao => botao.addEventListener("click", clicarBotao))

//console.log(verificarLinhas(tabuleiro))