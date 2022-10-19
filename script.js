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
        const opponentWins = document.querySelector('.opponent-wins');
        const smallOpponentWins = document.querySelector('.small-opponent-wins');
        const firstPlayerName = document.querySelector('.first-player-name');
        const secondPlayerName = document.querySelector('.second-player-name');
        const level = document.getElementById('level');

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
            opponentWins.style.color = 'var(--blue)';
            smallOpponentWins.style.color = 'var(--blue)';
            secondPlayerName.style.display = 'block';
            
            fightButton.addEventListener('click', () => {        
                if(firstPlayerInput.value === '') {
                    firstPlayerName.textContent = 'Player 1';
                } else {
                    firstPlayerName.textContent = firstPlayerInput.value;
                }

                if(secondPlayerInput.value === '') {
                    secondPlayerName.textContent = 'Player 2'
                } else {
                    secondPlayerName.textContent = secondPlayerInput.value;
                }
                secondPlayerName.style.color = 'var(--blue)';
            });
            level.style.display = 'none';
        }
        if(modeName === 'ai') {
            const easyLevel = document.querySelector('.easy');
            const midLevel = document.querySelector('.mid');
            const hardLevel = document.querySelector('.hard');
            opponentFaces.forEach(opponentFace => {
                opponentFace.setAttribute('src', 'img/robot.svg');
            });
            opponentSigns.forEach(opponentSign => {
                opponentSign.setAttribute('src', 'img/circle-red.svg');
            });
            aiLevels.style.display = 'flex';
            firstPlayerInput.style.display = 'none';
            secondPlayerInput.style.display = 'none';
            firstPlayerName.textContent = 'Human';
            opponentWins.style.color = 'var(--red)';
            smallOpponentWins.style.color = 'var(--red)';
            firstPlayerName.textContent = 'Human';
            secondPlayerName.style.display = 'none';
            level.style.display = 'block';
            easyLevel.addEventListener('click', () => {
                level.classList.add('easy');
                level.textContent = 'EASY'
            });
            midLevel.addEventListener('click', () => {
                level.classList.add('mid');
                level.textContent = 'MID'
            });
            hardLevel.addEventListener('click', () => {
                level.classList.add('hard');
                level.textContent = 'HARD'
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