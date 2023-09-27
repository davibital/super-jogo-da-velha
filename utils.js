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

const transposta = (matriz) => {
  const transformarColunaEmLinha = (matriz, coluna) => matriz.map((linha) => linha[coluna])
  const transpostaAux = (matriz, coluna = 0) => {
    if (coluna > matriz.length - 1) return []
    else return [transformarColunaEmLinha(matriz, coluna), ...transpostaAux(matriz, coluna += 1)]
  }
  return transpostaAux(matriz)
}

export { criarTabuleiro, transposta }