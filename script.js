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
        const firstPlayerInput = document.querySelector('.player-1-input');
        const secondPlayerInput = document.querySelector('.player-2-input');
        const aiLevels = document.querySelector('.ai-levels');


        modeMenu.style.display = 'none';
        playModePreview.style.display = 'flex';

        if(modeName === 'twoPlayers') {
            opponentFaces.forEach(opponentFace => {
                opponentFace.setAttribute('src', 'img/player-blue.svg');
            });
            opponentSigns.forEach(opponentSign => {
                opponentSign.setAttribute('src', 'img/circle-blue.svg');
            });
            aiLevels.style.display = 'none';
            firstPlayerInput.style.display = 'block';
            secondPlayerInput.style.display = 'block';
        }
        if(modeName === 'ai') {
            opponentFaces.forEach(opponentFace => {
                opponentFace.setAttribute('src', 'img/robot.svg');
            });
            opponentSigns.forEach(opponentSign => {
                opponentSign.setAttribute('src', 'img/circle-red.svg');
            });
            aiLevels.style.display = 'flex';
            firstPlayerInput.style.display = 'none';
            secondPlayerInput.style.display = 'none';
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