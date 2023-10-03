import { criarTabuleiro, removerAcaoBotoes, gerarSequenciaTurnos } from './utils.js'
import { verificarVencedor } from './verificacoes.js'

// Cria um tabuleiro 3x3 para o jogo grande
const tabuleiroGrande = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => criarTabuleiro(3)(3)));

// Registro com o nome dos jogadores e respectivo símbolo
const jogadores = [{ nome: 'J1', simbolo: 'X' }, { nome: 'J2', simbolo: 'O' }];

// Lista com a determinada sequência dos símbolos de quem joga primeiro e por último. (Gerada aleatoriamente) 
const sequenciaTurnos = gerarSequenciaTurnos(jogadores);
console.log("Esta é a sequência do jogo: ", sequenciaTurnos);

// Esta função serve para passar a vez (turno) após uma jogada
const passarVez = () => sequenciaTurnos.reverse()

/*
// Registro  para armazenar o placar
const placar = { 'O': 0, 'X': 0 };

// Função para atualizar o placar na interface
const atualizarPlacar = () => {
  document.getElementById('placarO').innerText = `Jogador 1 (O): ${placar['O']}`;
  document.getElementById('placarX').innerText = `Jogador 2 (X): ${placar['X']}`;
}
*/

// Esta função permite que o símbolo seja ilustrado sobreposto ao Jogo da Velha pequeno
const vencedorNoTabuleiroMenor = (elementoDoTabuleiroMenor, SimboloVencedor) => {
  // Esta linha procura por um elemento que tenha a classe "vencedor" em cada Jogo Pequeno (div)
  const simbolo = elementoDoTabuleiroMenor.querySelector('.vencedor');
  // Esta linha faz com o simbolo vencedor seja exibido
  simbolo.innerText = SimboloVencedor;
  // Esta linha tornar o simbolo visivel.  
  simbolo.style.display = 'flex'; 
};

// Função para lidar com uma vitória em um Jogo da Velha pequeno
const manipularVitoriaTabuleiroPequeno = (elementoPai, linhaGrande, colunaGrande, turnoAtual = sequenciaTurnos[0]) => {
  // Atualiza o tabuleiro grande com o vencedor do tabuleiro pequeno
  tabuleiroGrande[linhaGrande][colunaGrande] = turnoAtual;
  // Remove ação de todos os botões do tabuleiro pequeno vencido
  const listaBotoes = Array.from(elementoPai.querySelectorAll("button"));
  removerAcaoBotoes(listaBotoes, clicarBotao);

  // Exibe o símbolo do jogador vencedor na grade menor correspondente.
  vencedorNoTabuleiroMenor(elementoPai, turnoAtual);
}

// Função para verificar o estado geral do jogo, verificando se alguém já venceu a partida
const verificarEstadoJogo = (turnoAtual = sequenciaTurnos[0]) => {
  const vencedor = verificarVencedor(tabuleiroGrande);
  if (vencedor) {
    // Remove ação de todos os botões do jogo, finalizando a partida. 
    removerAcaoBotoes(Array.from(document.querySelectorAll("button")), clicarBotao)
    
    console.log(`"${turnoAtual}" VENCEU O JOGO!`); // alert(`${turnoAtual} VENCEU O JOGO!`);
    // Aqui podemos adicionar código para encerrar o jogo, se assim desejar
  }
}

// Esta função é responsável pelo evento de clique de um botão. 
const clicarBotao = (eventoClique, turnoAtual = sequenciaTurnos[0]) => {
  // Obtém o botão clicado
  const botao = eventoClique.srcElement;

  // Obtém o "elemento pai" do botão
  const elementoPai = botao.parentElement;
  
  // Obtém as coordenadas do Jogo da Velha pequeno onde a jogada foi efetuada.
  const linhaGrande = elementoPai.id[0];
  const colunaGrande = elementoPai.id[1];
  
  // Obtém as coordenadas do botão pressionado.
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
    manipularVitoriaTabuleiroPequeno(elementoPai, linhaGrande, colunaGrande);
  }
  
  // Verifica o estado geral da partida
  verificarEstadoJogo()
  
  // Passa a vez após a jogada
  passarVez();
}

// Adicionando o evento de clique a todos os botões
const botoes = Array.from(document.querySelectorAll("button")).map(botao => botao.addEventListener("click", clicarBotao))