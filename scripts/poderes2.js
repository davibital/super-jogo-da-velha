import * as random from './random.js';
import * as actions from './actions.js';
import { tabuleiroGrande, jogadores, sequenciaTurnos } from './main.js';

const embaralharJogoPequeno = (linhaJogoPequeno, colunaJogoPequeno) => {
  const jogoPequenoJS = tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno]
  const jogoPequenoJSEmbaralhado = random.embaralharMatriz(jogoPequenoJS)

  tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno] = jogoPequenoJSEmbaralhado
  //actions.atualizarTabuleiroHTML()
}

const embaralharJogoPequenoAleatorio = () => {
  const indexLinhaAleatorio = random.randint(0, tabuleiroGrande.length - 1)
  const indexColunaAleatorio = random.randint(0, tabuleiroGrande.length - 1)

  const jogoSorteado = tabuleiroGrande[indexLinhaAleatorio][indexColunaAleatorio]
  if (Array.isArray(jogoSorteado)) return embaralharJogoPequeno(indexLinhaAleatorio, indexColunaAleatorio)
  else return embaralharJogoPequenoAleatorio()
}

const embaralharTabuleiro = () => {
  tabuleiroGrande.map((linhaGrande, indexLinhaJogo) => {
    linhaGrande.map((jogoPequeno, indexColunaJogo) => {
      if (Array.isArray(jogoPequeno)) return embaralharJogoPequeno(indexLinhaJogo, indexColunaJogo)
    })
  })
}