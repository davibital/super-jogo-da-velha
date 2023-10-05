/**
 * Função para alternar o símbolo de alguma casa do tabuleiro pequeno que já foi ocupada
 * @param {String} turnoAtual - Símbolo que representa o turno atual 
 * @returns 
 */
const alternarSimboloBotao = (turnoAtual) => (eventoClique) => {
  const botao = eventoClique.srcElement;
  
  if (botao.innerText != turnoAtual)
    botao.innerText = turnoAtual;
}

export { alternarSimboloBotao };