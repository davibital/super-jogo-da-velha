import { criarTabuleiro,  obterDimensoesTabuleiro, ativarJogadores } from './utils.js'
import { sortearPoder, listaPoderes } from './poderes.js';
import { verificarVencedor } from './verificacoes.js'
import { gerarSequenciaTurnos } from './random.js';
import { atualizarTabuleiroHTML, passarVez } from './actions.js';
import { removerAcaoBotoes } from './jogar.js';

// Obtendo as dimensões do tabuleiro, passando como parâmetro o elemento HTML que é uma div que possui a classe "grid-jogo"
const dimensoes = obterDimensoesTabuleiro(document.querySelector("div>.grid-jogo"));
const linhas = dimensoes[0];
const colunas = dimensoes[1];

// Cria um tabuleiro 3x3 para o jogo grande
const tabuleiroGrandeVazio = criarTabuleiro(linhas)(colunas);

const tabuleiroGrande = tabuleiroGrandeVazio.map(linha => linha.map(() => criarTabuleiro(linhas)(colunas)));

// Registro com o nome dos jogadores e respectivo símbolo
const listaJogadores = Array.from(document.querySelectorAll(".jogador"))
  .map(elemento => {
    const nome = elemento.querySelector(".nome").innerHTML;
    const simbolo = elemento.querySelector(".simbolo").innerHTML;

    return { nome: nome, simbolo: simbolo };
  });

// Lista com a determinada sequência dos símbolos de quem joga primeiro e por último. (Gerada aleatoriamente) 
const sequenciaTurnos = gerarSequenciaTurnos(listaJogadores);

const jogadores = listaJogadores.map(jogador => {
  return { nome: jogador.nome, simbolo: jogador.simbolo, poder: listaPoderes[0](sequenciaTurnos) }
});

const sortearPoderJogadores = sortearPoder(jogadores, sequenciaTurnos);

const ativarJogadorDaRodada = ativarJogadores(jogadores)(sortearPoderJogadores);
ativarJogadorDaRodada(sequenciaTurnos[0]);

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

  // Exibe o símbolo do jogador vencedor na grade menor correspondente.
  vencedorNoTabuleiroMenor(elementoPai, turnoAtual);
}

/**
 * Função para verificar o estado geral do jogo, verificando se alguém já venceu a partida.
 * @returns {Boolean} Valor booleano que indica se houve vencedor ou não.
 */
const temVencedor = () => {
  const vencedor = verificarVencedor(tabuleiroGrande);
  if (vencedor) {
    // Remove ação de todos os botões do jogo, finalizando a partida.

    const ultimoJogador = document.querySelector(".jogador.ativo")
    const simboloUltimoJogador = ultimoJogador.querySelector(".simbolo").innerHTML;

    const jogadorVencedor = jogadores.reduce((jogadorVecedor, jogadorAtual) => {
      if (jogadorAtual.simbolo == simboloUltimoJogador)
        jogadorVecedor = jogadorAtual;
      
      return jogadorVecedor;
    }, '');

    console.log(`"${jogadorVencedor.nome}" VENCEU O JOGO!`); // alert(`${turnoAtual} VENCEU O JOGO!`);
    // Aqui podemos adicionar código para encerrar o jogo, se assim desejar
    return true;
  }

  return false;
}

// Esta função é responsável pelo evento de clique de um botão. 
const clicarBotaoGeral = (sequenciaTurnos) => (eventoClique) => {
  const turnoAtual = sequenciaTurnos[0];
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

  const jogadorAtual = jogadores.reduce((jogadorAtual, jogador) => {
    if (jogador.simbolo == turnoAtual) jogadorAtual = jogador;

    return jogadorAtual;
  });

  if (!jogadorAtual.poder(turnoAtual)(tabuleiroPequeno, linhaPequeno, colunaPequeno))
    return;
  
  // Retorna à ação padrão do jogador, que é a de inserir o símbolo em uma casa vazia.
  jogadorAtual.poder = listaPoderes[0](sequenciaTurnos);
  // Atualiza a interface
  atualizarTabuleiroHTML();
  
  // Verifica se há um vencedor no tabuleiro pequeno
  if (verificarVencedor(tabuleiroPequeno)) {
    manipularVitoriaTabuleiroPequeno(elementoPai, linhaGrande, colunaGrande);
  } else {
    const existePosicaoDisponivel = tabuleiroPequeno.reduce((acc, linha) => {
      const linhaDisponivel = linha.reduce((acc, elemento) => {
        if (elemento == '')
          acc = true;
        return acc;
      }, false);

      if (linhaDisponivel)
        acc = true;

      return acc;
    }, false);
    
    if (!existePosicaoDisponivel) manipularVitoriaTabuleiroPequeno(elementoPai, linhaGrande, colunaGrande, "?");
  }
  
  // Verifica o estado geral da partida e passa a vez caso não exista um vencedor
  if (!temVencedor()) 
    passarVez(sequenciaTurnos);
  else {
    removerAcaoBotoes(clicarBotao);
    removerAcaoBotoes(sortearPoderJogadores);

    const jogadorAtivo = document.querySelector(".ativo");
    jogadorAtivo.classList.remove("ativo");
  }
}

const clicarBotao = clicarBotaoGeral(sequenciaTurnos);

// Adicionando o evento de clique a todos os botões
const botoes = Array.from(document.querySelectorAll("#conteudo-jogo button"));
botoes.map(botao => botao.addEventListener("click", clicarBotao));

export { tabuleiroGrande, ativarJogadorDaRodada, sortearPoderJogadores }