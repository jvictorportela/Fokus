const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');

//images
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon');
const imagePlay = new Image('/images/play_arrow.png');
const imagePause = new Image('/images/pause.png');

//Áudios
const somFimTemporizador = new Audio('/audios/beep.mp3');
const somPlayTemporizador = new Audio('/audios/play.wav');
const somPauseTemporizador = new Audio('/audios/pause.mp3');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/audios/luna-rise-part-one.mp3');

let intervaloId = null;
let tempoDecorridoEmSegundos = 1500;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    mostarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/images/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        somPauseTemporizador.play();
        zerar();
        startPauseIcon.src = '/images/play_arrow.png'; // Altera o ícone para o ícone de play
        return;
    }
    somPlayTemporizador.play();
    intervaloId = setInterval(contagemRegressiva, 1000);

    iniciarOuPausarBt.textContent = "Pausar";
    startPauseIcon.src = '/images/pause.png'; // Altera o ícone para o ícone de pause
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
    startPauseIcon.src = '/images/play_arrow.png';
}

function mostarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostarTempo();