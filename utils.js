const criarTabuleiro = (linhas) => (colunas) => {
  if (linhas == 0)
    return []
  else
    return [criarLinha(colunas), ...criarTabuleiro(linhas - 1)(colunas)]
  
  function criarLinha(colunas) {
    if (colunas == 0)
      return []
    else
      return ['', ...criarLinha(colunas - 1)]
  }
}


const transpostaMatriz = (matriz) => {
  const transformarColunaEmLinha = (matriz, coluna) => matriz.map((linha) => linha[coluna])
  const transpostaAux = (matriz, coluna = 0) => {
    if (coluna > matriz.length - 1) return []
    else return [transformarColunaEmLinha(matriz, coluna), ...transpostaAux(matriz, coluna += 1)]
  }
  return transpostaAux(matriz)
}

const tracoMatriz = (matriz) => {
  const tracoAux = ([x, ...xs], coluna = 0) => {
    if (typeof x == "undefined") return ''
    else return x[coluna] + tracoAux(xs, coluna += 1)
  }
  return tracoAux(matriz)
}

const tracoSecundario = (matriz) => {
  const tracoAux = ([x, ...xs], coluna = matriz.length - 1) => {
    if (typeof x == "undefined") return ''
    else return x[coluna] + tracoAux(xs, coluna -= 1)
  }
  return tracoAux(matriz)
}


export { criarTabuleiro, transpostaMatriz, tracoMatriz, tracoSecundario }