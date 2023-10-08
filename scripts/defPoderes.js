import { embaralharMatriz, randint } from './random.js';
import { tabuleiroGrande, jogadores, sequenciaTurnos } from './main.js';

const embaralharJogoPequeno = (linhaJogoPequeno, colunaJogoPequeno) => {
  const jogoPequenoJS = tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno]
  const jogoPequenoJSEmbaralhado = embaralharMatriz(jogoPequenoJS)

  tabuleiroGrande[linhaJogoPequeno][colunaJogoPequeno] = jogoPequenoJSEmbaralhado
}

const embaralharJogoPequenoAleatorio = () => {
  const indexLinhaAleatorio = randint(0, tabuleiroGrande.length - 1)
  const indexColunaAleatorio = randint(0, tabuleiroGrande.length - 1)

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

const listaPoderes = [
    embaralharJogoPequeno,
    embaralharJogoPequenoAleatorio,
    embaralharTabuleiro
]

export { listaPoderes }