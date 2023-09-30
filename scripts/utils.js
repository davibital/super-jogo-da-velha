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

const tracoPrincipal = (matriz) => {
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

const verificarCaracteresIguais = (str) => {
  const verificarAux = (str, acc = 0) => {
    const x = str[acc] // A constante 'x' é o caractere na posição 'acc' na string.
    const y = str[acc+1] // A constante 'y' é o caractere que ocupado uma posição a frente do caractere armazenado em 'x'.
    if (typeof x == "undefined") return true // Esse caso base retorna true quando a string de entrada é vazia.
    else if (typeof y == "undefined") return true // Quando a string de entrada tem apenas um caractere, retorna true. Esse caso base é o caso que dá o stop na recursão. 
    else return (x === y) && verificarAux(str, acc += 1) // Fórmula Recursiva
  }
  return verificarAux(str)
}

const desaninhar = ([x, ...xs]) => {
  if (typeof x == "undefined") return []
  else return [...x, ...desaninhar(xs)]
}

const aninhar = (lista, tamanhoListas) => {
  if (lista.length === 0) return []
  else return [lista.slice(0, tamanhoListas), ...aninhar(lista.slice(tamanhoListas), tamanhoListas)]
} 

const removerAcaoBotoes = (listaBotoes, funcao) => {
  listaBotoes.map(botao => botao.removeEventListener("click", funcao))
}

export { criarTabuleiro, transpostaMatriz, tracoPrincipal, tracoSecundario, verificarCaracteresIguais, desaninhar, aninhar, removerAcaoBotoes }