const personagem = document.getElementById('personagem');
const jogo = document.getElementById('jogo');
let pontuacao = 0;
let blocoInterval;

document.addEventListener('keydown', moverPersonagem);

function moverPersonagem(evento) {
    const personagemEsquerda = personagem.offsetLeft;

    if (evento.key === 'ArrowLeft' && personagemEsquerda > 0) {
        personagem.style.left = personagemEsquerda - 10 + 'px';
    } else if (evento.key === 'ArrowRight' && personagemEsquerda < jogo.offsetWidth - personagem.offsetWidth) {
        personagem.style.left = personagemEsquerda + 10 + 'px';
    }
}

function criarBloco() {
    const bloco = document.createElement('div');
    bloco.classList.add('bloco');
    bloco.style.left = Math.floor(Math.random() * (jogo.offsetWidth - 30)) + 'px';
    jogo.appendChild(bloco);

    let movimentoBloco = setInterval(function() {
        bloco.style.top = bloco.offsetTop + 5 + 'px';

        // Verificar colisão
        if (colisao(bloco, personagem)) {
            clearInterval(movimentoBloco);
            alert('Game Over! Pontuação final: ' + pontuacao);
            clearInterval(blocoInterval);
            location.reload();
        }

        // Remover bloco quando ele sair da tela
        if (bloco.offsetTop > jogo.offsetHeight) {
            clearInterval(movimentoBloco);
            jogo.removeChild(bloco);
            pontuacao++;
            document.getElementById('pontuacao').innerText = 'Pontuação: ' + pontuacao;
        }
    }, 20);
}

function colisao(bloco, personagem) {
    const blocoRect = bloco.getBoundingClientRect();
    const personagemRect = personagem.getBoundingClientRect();

    return !(
        blocoRect.bottom < personagemRect.top ||
        blocoRect.top > personagemRect.bottom ||
        blocoRect.right < personagemRect.left ||
        blocoRect.left > personagemRect.right
    );
}

function iniciarJogo() {
    blocoInterval = setInterval(criarBloco, 1000);
}

iniciarJogo();