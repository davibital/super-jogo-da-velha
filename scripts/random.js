import * as utils from './utils.js';

/**
 * Esta função serve para embaralhar elementos de uma lista qualquer de acordo com o algoritmo de Fisher-Yates.
 * @param {Array} lista - Lista que terá seus elementos embaralhados.
 * @returns {Array} - Lista embaralhada.
 */
const embaralharLista = (lista) => {
    const embaralharAux = (lista, indexAtual = lista.length - 1) => {
        const indexAleatorio = Math.floor(Math.random() * (indexAtual + 1)) // Índice aleatório de um elemento que terá sua posição trocada pelo elemento do índice atual.
        if (indexAtual === 0) return lista // Caso base: O algoritmo parte do último elemento e "caminha" até o primeiro (não incluso).
        else {
            [lista[indexAtual], lista[indexAleatorio]] = [lista[indexAleatorio], lista[indexAtual]] 
            // Atribuição via desestruturação (destructuring assignment)
            // Esse é um recurso que possibilita a troca de lugar (swap) de elementos de uma lista.
            return embaralharAux(lista, indexAtual -= 1)
        }
    }
    if (lista.length === 0) return []
    else return embaralharAux(lista)
}

/**
 * Esta função serve para embaralhar elementos de uma matriz.
 * Isso é feito a partir do processo de desaninhar a matriz, embaralhar via Algoritmo de Fisher-Yates os elementos, 
 * e aninhar esses elementos em listas "internas" (reconstruir a matriz).
 * @param {Array} matriz - Matriz de duas dimensões que terá seus elementos embaralhados.
 * @returns {Array} - Matriz embaralhada.
 */
const embaralharMatriz = (matriz) => {
    const listaMatriz = utils.desaninhar(matriz) // "Destruição" da matriz (lista de listas) em uma única lista.
    const listaEmbaralhada = embaralharLista(listaMatriz) // Embaralhamento dessa lista.
    const matrizEmbaralhada = utils.aninhar(listaEmbaralhada, matriz.length) // "Reconstrunção" da matriz a partir dessa lista embaralhada.
    return matrizEmbaralhada
}

export { embaralharLista, embaralharMatriz }