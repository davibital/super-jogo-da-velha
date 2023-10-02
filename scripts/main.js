import { criarTabuleiro, removerAcaoBotoes, gerarSequenciaTurnos } from './utils.js'
import { verificarVencedor } from './verificacoes.js'

// Cria um tabuleiro 3x3 para o jogo grande
const tabuleiroGrande = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => criarTabuleiro(3)(3)));

const jogadores = [{ nome: 'J1', simbolo: 'X' }, { nome: 'J2', simbolo: 'O' }];
const sequenciaTurnos = gerarSequenciaTurnos(jogadores);
console.log("Esta é a sequência do jogo: ", sequenciaTurnos);

// Variável para armazenar o turno atual
let turnoAtual = sequenciaTurnos[0];

// Objeto para armazenar o placar
let placar = { 'O': 0, 'X': 0 };

// Função para atualizar o placar na interface
const atualizarPlacar = () => {
  document.getElementById('placarO').innerText = `Jogador 1 (O): ${placar['O']}`;
  document.getElementById('placarX').innerText = `Jogador 2 (X): ${placar['X']}`;
}

// Função para mudar o turno
const atualizarTurno = () => {
  turnoAtual = turnoAtual === 'O' ? 'X' : 'O';
}

// Função para verificar o estado geral do jogo
const verificarEstadoJogo = () => {
  const vencedor = verificarVencedor(tabuleiroGrande);
  if (vencedor) {
    alert(`${vencedor} VENCEU O JOGO!`);
    // Aqui podemos adicionar código para encerrar o jogo, se assim desejar
  }
}

// Função para lidar com uma vitória em um tabuleiro pequeno
const manipularVitoria = (elementoPai, linhaGrande, colunaGrande) => {
  // Atualiza o tabuleiro grande com o vencedor do tabuleiro pequeno
  tabuleiroGrande[linhaGrande][colunaGrande] = turnoAtual;
  // Remove ação de todos os botões do tabuleiro pequeno vencido
  const listaBotoes = Array.from(elementoPai.querySelectorAll("button"));
  removerAcaoBotoes(listaBotoes, clicarBotao);
  // Atualiza o placar
  placar[turnoAtual]++;
  // Atualiza o placar na interface
  atualizarPlacar();
  // Exibe um alerta indicando quem venceu o tabuleiro pequeno
  alert(`Jogador ${turnoAtual === 'O' ? 1 : 2} venceu o tabuleiro pequeno`);
}

// Função para lidar com o evento de clique em um botão
const clicarBotao = (eventoClique) => {
  // Obtém o botão clicado
  const botao = eventoClique.srcElement;
  // Obtém o elemento pai do botão
  const elementoPai = botao.parentElement;
  // Obtém as coordenadas do tabuleiro grande
  const linhaGrande = elementoPai.id[0];
  const colunaGrande = elementoPai.id[1];
  // Obtém as coordenadas do tabuleiro pequeno
  const linhaPequeno = botao.className[0];
  const colunaPequeno = botao.className[1];
  // Obtém o tabuleiro pequeno correspondente no tabuleiro grande
  const tabuleiroPequeno = tabuleiroGrande[linhaGrande][colunaGrande];
  // Atualiza o tabuleiro pequeno e a interface
  tabuleiroPequeno[linhaPequeno][colunaPequeno] = turnoAtual;
  botao.innerHTML = turnoAtual;
  // Remove o evento de clique para esse botão
  botao.removeEventListener("click", clicarBotao);
  // Verifica se há um vencedor no tabuleiro pequeno
  if (verificarVencedor(tabuleiroPequeno)) {
    manipularVitoria(elementoPai, linhaGrande, colunaGrande);
  }
  // Muda o turno
  atualizarTurno();
  // Verifica o estado geral do jogo
  verificarEstadoJogo();
}

// Associa o evento de clique a todos os botões
document.querySelectorAll("button").forEach(botao => botao.addEventListener("click", clicarBotao));

// Inicializa o placar na interface
atualizarPlacar();
