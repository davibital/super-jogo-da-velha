import { tabuleiroGrande, jogadores, sequenciaTurnos } from './main.js';

// Esta função serve para passar a vez (turno) após uma jogada
const passarVez = () => sequenciaTurnos.reverse()

const atualizarTabuleiroHTML = () => {
    tabuleiroGrande.map((linhaGrande, indexLinhaJogoPequeno) => {
        linhaGrande.map((jogoPequeno, indexColunaJogoPequeno) => {
            if (Array.isArray(jogoPequeno)) {
                jogoPequeno.map((linhaPequena, indexLinhaBotao) => {
                    linhaPequena.map((botao, indexColunaBotao) => {
                        // Especificando a localização (id e class) do Jogo Pequeno e dos Botões
                        const idJogoPequeno = indexLinhaJogoPequeno.toString() + indexColunaJogoPequeno.toString()
                        const classBotao = indexLinhaBotao.toString() + indexColunaBotao.toString()
                        
                        // Selecionando os elementos do HTML 
                        const jogoPequeno = document.getElementById(idJogoPequeno)
                        const botaoHTML = jogoPequeno.getElementsByClassName(classBotao)
                        
                        // Fazendo o match entre o conteúdo presente na lista do Javascript e o HTML (interface)
                        botaoHTML.innerHTML = botao
                    })
                })
            }
        })
    }) 
}

export { passarVez, atualizarTabuleiroHTML }