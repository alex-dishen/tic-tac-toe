const modeMenu = document.querySelector('.menu');
const modes = document.querySelectorAll('.mode');
const playModePreview = document.querySelector('.play-mode');
const fightButton = document.querySelector('.fight-button');
const backBtns = document.querySelectorAll('.back-navigation');
const playground = document.querySelector('.playground');

modes.forEach(mode => {
    mode.addEventListener('click', () => {
        const modeName = mode.getAttribute('data-name');
        const opponentFaces = document.querySelectorAll('.opponent-face');
        const opponentSigns = document.querySelectorAll('.opponent-sign');
        modeMenu.style.display = 'none';
        playModePreview.style.display = 'flex';

        if(modeName === 'twoPlayers') {
            opponentFaces.forEach(opponentFace => {
                opponentFace.setAttribute('src', 'img/player-blue.svg');
            });
            opponentSigns.forEach(opponentSign => {
                opponentSign.setAttribute('src', 'img/circle-blue.svg');
            });
        }
        if(modeName === 'ai') {
            opponentFaces.forEach(opponentFace => {
                opponentFace.setAttribute('src', 'img/robot.svg');
            });
            opponentSigns.forEach(opponentSign => {
                opponentSign.setAttribute('src', 'img/circle-red.svg');
            });
        }
    })
});

fightButton.addEventListener('click', () => {
    playModePreview.style.display = 'none';
    playground.style.display = 'grid';
});

backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        playground.style.display = 'none';
        playModePreview.style.display = 'none';
        modeMenu.style.display = 'flex';
    });
});