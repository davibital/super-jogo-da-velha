const configurarJogo = () => window.location.href = './configuracoes.html';

const mostrarRegras = () => window.location.href = './regras.html';

const botaoJogar = document.getElementById("botao-jogar");
const botaoRegras = document.getElementById("botao-regras");
botaoJogar.addEventListener("click", configurarJogo);
botaoRegras.addEventListener("click", mostrarRegras);