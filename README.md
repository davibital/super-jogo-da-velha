# Super Jogo da Velha

Este jogo é baseado no clássico jogo da velha, porém com algumas adições que trazem um certo dinamismo ao jogo.

## Dinâmica do jogo

O jogo é formado por um tabuleiro grande de dimensões 3 x 3 e cada posição desse tabuleiro é ocupado por um outro tabuleiro 3 x 3. É neste tabuleiro menor que o jogo é jogado de fato.

Os jogadores irão jogar os seus símbolos nos tabuleiros pequenos, respeitando o turno de cada jogador, quando um jogador completa uma linha, ou coluna, ou diagonal com o seu símbolo, o tabuleiro é finalizado com a vitória desse jogador.

Sempre que um tabuleiro pequeno é finalizado, ele é substituído pelo símbolo vencedor daquele tabuleiro, caso ocorra um empate, é substituído por um símbolo coringa.

### Poderes

Os jogadores têm a possibiliadade de sortear um poder para utilizar na rodada, dentre eles:

  - Inserção -> É a ação base do jogador, que consiste em inserir o seu símbolo em uma casa desocupada.
  - Substituição -> Substitui uma casa ocupada pelo símbolo do oponente com o seu próprio símbolo.
  - Embaralhamento Direto -> Seleciona um tabuleiro pequeno para ser embaralhado.
  - Embaralhamento Indireto -> Embaralha todo o tabuleiro, com exceção dos tabuleiros já finalizados.
  - Próximo! -> Esse é o poder com maior probabilidade de se obter, ele simplesmente passa a vez para o oponente.

## Objetivo

Os jogadores têm como objetivo completar uma linha, ou coluna, ou diagonal do tabuleiro maior com o seu símbolo para assim se consagrar o grande vencedor!