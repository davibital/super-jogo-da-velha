/**
 * Função para iniciar o jogo com as configurações dos jogadores, assim como as configurações do tabuleiro.
 * @param {HTMLElement} formularioPrimeiroJogador - Form do HTML que representa os dados do primeiro jogador.
 * @param {HTMLElement} formularioSegundoJogador - Form do HTML que representa os dados do segundo jogador.
 * @param {HTMLElement} formularioTabuleiro - Form do HTML que representa os dados do tabuleiro.
 */
const configurarJogo = (formularioPrimeiroJogador, formularioSegundoJogador, formularioTabuleiro) => () => {
  // Obtenção dos dados dos jogadores conforme informado no formulário
  const primeiroJogador = {
    nome: formularioPrimeiroJogador.querySelector("#nome-jogador").value,
    simbolo: formularioPrimeiroJogador.querySelector("#simbolo-jogador").value
  };

  const segundoJogador = {
    nome: formularioSegundoJogador.querySelector("#nome-jogador").value,
    simbolo: formularioSegundoJogador.querySelector("#simbolo-jogador").value
  };
 
  if (primeiroJogador.simbolo === segundoJogador.simbolo) {
    alert ('O símbolo do primeiro jogador não pode ser igual ao do segundo jogador!')
    formularioPrimeiroJogador.querySelector("#simbolo-jogador").value = '';
    formularioSegundoJogador.querySelector("#simbolo-jogador").value = '';
    return;
  }

  if (primeiroJogador.nome === segundoJogador.nome) {
    alert ('O nome do primeiro jogador não pode ser igual ao do segundo jogador!')
    formularioPrimeiroJogador.querySelector("#nome-jogador").value = '';
    formularioSegundoJogador.querySelector("#nome-jogador").value = '';
    return
  }

  if (primeiroJogador.nome === '' || segundoJogador.nome === '') {
    alert('O nome não pode ser vazio!');
    return;
  }

  if (primeiroJogador.simbolo === '' || segundoJogador.simbolo === '') {
    alert('O símbolo não pode ser vazio!');
    return;
  }

  if (primeiroJogador.simbolo === '?' || segundoJogador.simbolo === '?') {
    alert('O símbolo selecionado é o símbolo coringa, escolha outro símbolo!');
    formularioPrimeiroJogador.querySelector("#simbolo-jogador").value = '';
    formularioSegundoJogador.querySelector("#simbolo-jogador").value = '';
    return;
  }

  const dimensoesTabuleiro = formularioTabuleiro.querySelector("#dimensoes-tabuleiro").value;

  localStorage.clear();

  // Salvando todas as informações no localStorage para serem usadas posteriormente no outro documento HTML, para a criação da interface
  localStorage.setItem("nomePrimeiroJogador", primeiroJogador.nome);
  localStorage.setItem("simboloPrimeiroJogador", primeiroJogador.simbolo);
  localStorage.setItem("nomeSegundoJogador", segundoJogador.nome);
  localStorage.setItem("simboloSegundoJogador", segundoJogador.simbolo);
  localStorage.setItem("dimensoesTabuleiro", dimensoesTabuleiro);

  window.location.href = './jogar.html';
}

const formularioPrimeiroJogador = document.getElementById("primeiro-jogador");
const formularioSegundoJogador = document.getElementById("segundo-jogador");
const formularioTabuleiro = document.getElementById("tabuleiro");

const iniciarJogo = configurarJogo(formularioPrimeiroJogador, formularioSegundoJogador, formularioTabuleiro);

const botaoIniciar = document.getElementById("botao-iniciar");

botaoIniciar.addEventListener("click", iniciarJogo);