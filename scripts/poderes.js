// Esta função serve para passar a vez (turno) após uma jogada
const passarVez = (sequenciaTurnos) => { sequenciaTurnos.reverse() }

/**
 * Função para sortear o poder do jogador e atribuir o poder a ele.
 * @param {Array} listaJogadores - Lista contendo as informações dos dois jogadores.
 */
const sortearPoder = (listaJogadores) => (evento) => {
  const botao = evento.srcElement;

  const elementoPai = botao.parentElement;

  const jogador = elementoPai.id.split("-")[1];
  const indiceJogador = jogador == "primeiro" ? 0 : 1;

  const poderSorteado = Math.floor(Math.random() * 9);

  listaJogadores[indiceJogador].poder = poderSorteado;
}

/**
 * Função para inserir o símbolo em alguma casa que esteja desocupada.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 * @param {HTMLElement} botao - Elemento HTML que representa o botão clicado.
 */
const inserirSimbolo = (sequenciaTurnos) => (botao) => {
  if (botao.innerText == '') return;

  const turnoAtual = sequenciaTurnos[0];

  botao.innerText = turnoAtual;
  passarVez(sequenciaTurnos);
}

/**
 * Função para alternar o símbolo de alguma casa do tabuleiro pequeno que já foi ocupada.
 * @param {Array} sequenciaTurnos - Lista que contém os símbolos na ordem em que serão jogados.
 * @param {HTMLElement} botao - Elemento HTML que representa o botão clicado.
 * @returns 
 */
const alternarSimbolo = (sequenciaTurnos) => (botao) => {
  const turnoAtual = sequenciaTurnos[0];

  if (botao.innerText == turnoAtual) return;

  botao.innerText = turnoAtual;
  passarVez(sequenciaTurnos);
}

export { inserirSimbolo, alternarSimbolo, sortearPoder, passarVez };