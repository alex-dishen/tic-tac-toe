const Player = (name) => {};

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
})();

const displayController = (() => {
    // MODE MENU
    const modeMenu = document.querySelector('.menu');
    const modes = document.querySelectorAll('.mode');
    
    // PRE-MATCH
    const playModePreview = document.querySelector('.play-mode');
    const firstPlayerInput = document.querySelector('.player-1-input');
    const secondPlayerInput = document.querySelector('.player-2-input');
    const aiLevels = document.querySelector('.ai-levels');
    const fightButton = document.querySelector('.fight-button');
    const backBtns = document.querySelectorAll('.back-navigation');
    const easyLevel = document.querySelector('.easy');
    const midLevel = document.querySelector('.mid');
    const hardLevel = document.querySelector('.hard');
    
    // PLAYERS ATTRIBUTES
    const opponentFaces = document.querySelectorAll('.opponent-face');
    const opponentSigns = document.querySelectorAll('.opponent-sign');
    const opponentWins = document.querySelector('.opponent-wins');
    const smallOpponentWins = document.querySelector('.small-opponent-wins');
    const firstPlayerName = document.querySelector('.first-player-name');
    const secondPlayerName = document.querySelector('.second-player-name');
    
    // PLAYGROUND
    const playground = document.querySelector('.playground');
    const level = document.getElementById('level');

    const showTwoPlayersPrematch = () => {
        opponentFaces.forEach(opponentFace => {
            opponentFace.setAttribute('src', 'img/player-blue.svg');
        });
        opponentSigns.forEach(opponentSign => {
            opponentSign.setAttribute('src', 'img/circle-blue.svg');
        });
        aiLevels.style.display = 'none';
        firstPlayerInput.style.display = 'block';
        secondPlayerInput.style.display = 'block';
    };

    const showAiPrematch = () => {
        opponentFaces.forEach(opponentFace => {
            opponentFace.setAttribute('src', 'img/robot.svg');
        });
        opponentSigns.forEach(opponentSign => {
            opponentSign.setAttribute('src', 'img/circle-red.svg');
        });
        firstPlayerInput.style.display = 'none';
        secondPlayerInput.style.display = 'none';
        aiLevels.style.display = 'flex';
    };
    
    const setDifficulty = () => {
        easyLevel.addEventListener('click', () => {
            easyLevel.classList.add('chosen-level');
            midLevel.classList.remove('chosen-level');
            hardLevel.classList.remove('chosen-level');
            //if user changes levels a few times the classes will be stored in an element
            //to prevent errors we clean element from classes every single time
            level.removeAttribute('class');
            level.classList.add('easy');
            level.textContent = 'EASY'
        });
        midLevel.addEventListener('click', () => {
            midLevel.classList.add('chosen-level');
            easyLevel.classList.remove('chosen-level');
            hardLevel.classList.remove('chosen-level');
            level.removeAttribute('class');
            level.classList.add('mid');
            level.textContent = 'MID'
        });
        hardLevel.addEventListener('click', () => {
            hardLevel.classList.add('chosen-level');
            midLevel.classList.remove('chosen-level');
            easyLevel.classList.remove('chosen-level');
            level.removeAttribute('class');
            level.classList.add('hard');
            level.textContent = 'HARD'
        });
    };

    const setPlaygroundForPlayers = () => {
        opponentWins.style.color = 'var(--blue)';
        smallOpponentWins.style.color = 'var(--blue)';
        secondPlayerName.style.color = 'var(--blue)';
        level.style.display = 'none';
        secondPlayerName.style.display = 'block';
        firstPlayerName.textContent = firstPlayerInput.value || 'Player 1';
        secondPlayerName.textContent = secondPlayerInput.value || 'Player 2';
    };

    const setPlaygroundForAi = () => {
        opponentWins.style.color = 'var(--red)';
        smallOpponentWins.style.color = 'var(--red)';
        firstPlayerName.textContent = 'Human';
        secondPlayerName.style.display = 'none';
        level.style.display = 'block';
        if(!level.getAttribute('class')) {
            level.classList.add('mid');
            level.textContent = 'MID';
        }
    };

    const clearPrematch = (() => {
        const showModeMenu = () => {
            playground.style.display = 'none';
            playModePreview.style.display = 'none';
            modeMenu.style.display = 'flex';
        };

        const twoPlayers = () => {
            firstPlayerInput.value = '';
            secondPlayerInput.value = '';
        };

        const ai = () => {
            easyLevel.classList.remove('chosen-level');
            midLevel.classList.remove('chosen-level');
            hardLevel.classList.remove('chosen-level');
        };

        return { showModeMenu ,twoPlayers, ai }
    })();

    const play = (mode) => {
        const modeName = mode.getAttribute('data-name');
        modeMenu.style.display = 'none';
        playModePreview.style.display = 'flex';

        if(modeName === 'twoPlayers') {
            showTwoPlayersPrematch();
            fightButton.addEventListener('click', setPlaygroundForPlayers);

            backBtns.forEach(btn => {
                btn.addEventListener('click', () => {clearPrematch.twoPlayers()});
            });
        }
        if(modeName === 'ai') {
            showAiPrematch();
            setDifficulty();
            fightButton.addEventListener('click', setPlaygroundForAi);

            backBtns.forEach(btn => {
                btn.addEventListener('click', () => {clearPrematch.ai()});
            });
        }
    };
    
    modes.forEach(mode => {
        mode.addEventListener('click', () => {play(mode)})
    });

    fightButton.addEventListener('click', () => {
        playModePreview.style.display = 'none';
        playground.style.display = 'grid';
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {clearPrematch.showModeMenu()});
    });
})();

const gameController = (() => {})();