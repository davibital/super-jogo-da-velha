import * as utils from './utils.js';

const embaralharLista = (lista) => {
    const embaralharAux = (lista, indexAtual = lista.length - 1) => {
        const indexAleatorio = Math.floor(Math.random() * (indexAtual + 1))
        if (indexAtual === 0) return lista
        else {
            [lista[indexAtual], lista[indexAleatorio]] = [lista[indexAleatorio], lista[indexAtual]]
            return embaralharAux(lista, indexAtual -= 1)
        }
    }
    if (lista.length === 0) return []
    else return embaralharAux(lista)
}


const embaralharMatriz = (matriz) => {
    const listaMatriz = utils.desaninhar(matriz)
    const listaEmbaralhada = embaralharLista(listaMatriz)
    const matrizEmbaralhada = utils.aninhar(listaEmbaralhada)
    return matrizEmbaralhada
}

export { embaralharLista, embaralharMatriz }