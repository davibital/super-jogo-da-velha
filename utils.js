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
export { criarTabuleiro }