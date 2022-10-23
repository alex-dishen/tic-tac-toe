const Player = (sign, face, name) => {
    return { sign, face, name };
}

const gameBoard = (() => {
    // The array contains numbers instead of ['', ''] && [null, null] to way
    //easier find an index to put the sign under, when the bot makes his choice
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    //     BOARD
    //  [0] [1] [2]
    //  [3] [4] [5]
    //  [6] [7] [8]
    const winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [7, 6, 8],
        [7, 4, 1]
    ];

    const addSignToBoard = (index, sign) => {
        board[index] = sign;
    };

    const resetBoard = () => {
        // Because board if located in another function, it can be reset to it's 
        //initial form only with a loop or it can be moved to displayController()
        //and the reset can be done with board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        for(let i = 0; i <= 8; i++) {
            board[i] = i;
        }
    };

    return { board, winningCombinations, addSignToBoard, resetBoard };
})();

const displayController = (() => {
//              ||||----------------------GAME LOGIC-------------------||||

    // img/cross.svg === X
    // img/circle-blue.svg && img/circle-red.svg === O
    const playerOne = Player('img/cross.svg', 'img/player.svg');
    const playerTwo = Player('img/circle-blue.svg', 'img/player-blue.svg');
    const botPlayer = Player('img/circle-red.svg', 'img/robot.svg');
    let currentPlayer = '';
    let playerOneScore = 0;
    let playerTwoScore = 0;

    const makeMove = (e) => {
        // e.target === square user clicked
        const squareIndex = e.target.id;
        
        if(typeof gameBoard.board[squareIndex] === 'number') {
            currentPlayer = currentPlayer === playerOne.sign ? 
                                playerTwo.sign : playerOne.sign;
            const img = document.createElement('img');
            gameBoard.addSignToBoard(squareIndex, currentPlayer);
            img.setAttribute('src', `${currentPlayer}`);
            e.target.appendChild(img);
        }
    };

    const indicateTheWinner = () => {
        //'.some' searches for at least one combination that meets our criteria
        //'.every' checks every single combinations number, and if every number
        // inside of any combination contains the same sign it returns 'true',
        // and it means that '.every' found the winning combination.
        const isWinner = gameBoard.winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard.board[index] === currentPlayer;
            })
        });

        const isTie = gameBoard.board.every(index => {
            return typeof index !== 'number';
        })

        if(isWinner) {
            return currentPlayer;
        }

        if(!isWinner && isTie) {
            return 'It\'s a tie'
        }
    };

    const getEmptySpots = () => {
        return gameBoard.board.filter(index => {
            return typeof index === 'number'
        });
    };

    const randomBotMove = () => {
        const emptySpots = getEmptySpots();
        const img = document.createElement('img');
        const randomIndex = Math.floor(Math.random() * emptySpots.length);

        gameBoard.addSignToBoard(emptySpots[randomIndex], botPlayer.sign);
        const square = document.getElementById(`${emptySpots[randomIndex]}`);
        img.setAttribute('src', `${botPlayer.sign}`);
        square.appendChild(img);
    };

    //              |||||---------------DISPLAY GAME--------------------|||||

    //          MENU
    const menu = document.querySelector('.menu');
    const twoPlayersMode = document.querySelector('.two-players-mode');
    const aiMode = document.querySelector('.ai-mode');

    //        PRE-MATCH
    const playMode = document.querySelector('.play-mode');
    const fightBtn = document.querySelector('.fight-button');
    const goBackBtns = document.querySelectorAll('.go-back');
    const aiLevels = document.querySelector('.ai-levels');
    const easyLevel = document.querySelector('.easy');
    const midLevel = document.querySelector('.mid');
    const hardLevel = document.querySelector('.hard');

    //      PLAYERS ATTRIBUTES
    const playerOneInput = document.querySelector('.player-1-input');
    const playerTwoInput = document.querySelector('.player-2-input');
    const opponentFaces = document.querySelectorAll('.opponent-face');
    const opponentSigns = document.querySelectorAll('.opponent-sign');
    const playerOneName = document.querySelector('.first-player-name');
    const opponentName = document.querySelector('.opponent-name');

    //         PLAYGROUND
    const playground = document.querySelector('.playground');
    const playerOneInfo = document.querySelector('.player-info');
    const opponentInfo = document.querySelector('.opponent-info'); 
    const smallPlayerOneInfo = document.querySelector('.first.small-player');
    const smallOpponentInfo = document.querySelector('.second.small-player');
    const playerOneWins = document.querySelector('.first-player-wins');
    const opponentWins = document.querySelector('.opponent-wins');
    const smallPlayerOneWins = document.querySelector('.small-first-player-wins');
    const smallOpponentWins = document.querySelector('.small-opponent-wins');
    const squares = document.querySelectorAll('.square');
    const overlay = document.querySelector('.overlay');
    const winnerName = document.querySelector('.winner');
    const winnerText = document.querySelector('.winner-text');
    const nextRoundBtn = document.querySelector('.next-round');
    const resetScoreBtn = document.querySelector('.reset-score');

    const showTwoPlayersPrematch = () => {
        menu.style.display = 'none';
        playMode.style.display = 'flex';
        playerOneInput.style.display = 'block';
        playerTwoInput. style.display = 'block';
        // Opponent face at pre match info and at playground
        opponentFaces.forEach(face => {
            face.setAttribute('src', `${playerTwo.face}`);
        });
        // Opponent sign at pre match info and at playground
        opponentSigns.forEach(sign => {
            sign.setAttribute('src', `${playerTwo.sign}`);
        });
    };

    const showAIPrematch = () => {
        menu.style.display = 'none';
        playMode.style.display = 'flex';
        aiLevels.style.display = 'flex'
        midLevel.classList.add('chosen-level');
        opponentFaces.forEach(face => {
            face.setAttribute('src', `${botPlayer.face}`);
        });
        opponentSigns.forEach(sign => {
            sign.setAttribute('src', `${botPlayer.sign}`);
        });
    };

    const addRemoveClass = (clas, elementToAdd, ...elementsToRemove) => {
        elementToAdd.classList.add(clas);
        elementsToRemove.forEach(element => {
            element.classList.remove(clas);
        });
    };

    const removeClass = (clas, ...elementsToRemove) => {
        elementsToRemove.forEach(element => {
            element.classList.remove(clas);
        });
    };

    const animateAILevels = (e) => {
        if(e.target.dataset.name === 'easy') {
            addRemoveClass('chosen-level', easyLevel, midLevel, hardLevel);
        } else if(e.target.dataset.name === 'mid') {
            addRemoveClass('chosen-level', midLevel, easyLevel, hardLevel);
        } else if(e.target.dataset.name === 'hard') {
            addRemoveClass('chosen-level', hardLevel, easyLevel, midLevel);
        }
    };

    const setNames = (() => {
        const twoPlayersNames = () => {
            playerOne.name = playerOneInput.value || 'Player 1';
            playerTwo.name = playerTwoInput.value || 'Player 2';
            playerOneName.textContent = playerOne.name;
            opponentName.textContent = playerTwo.name;
        };

        return { twoPlayersNames };
    })();

    const setColor = (color, ...elements) => {
        elements.forEach(element => {
            element.style.color = color;
        });
    };

    const animatePlayer = () => {
        if(currentPlayer === playerOne.sign) {
            addRemoveClass('chosen-level', opponentInfo, playerOneInfo);
            addRemoveClass('chosen-level', smallOpponentInfo, smallPlayerOneInfo);
        } else {
            addRemoveClass('chosen-level',playerOneInfo, opponentInfo);
            addRemoveClass('chosen-level',smallPlayerOneInfo, smallOpponentInfo);
        }
    };

    const showRoundResults = () => {
            overlay.style.display = 'flex';
            if(indicateTheWinner() === playerOne.sign) {
                setColor('var(--purple)', winnerName);
                winnerName.textContent = playerOne.name;
                winnerText.textContent = 'Wins!';
                playerOneScore += 1;
            } else if(indicateTheWinner() === playerTwo.sign){
                setColor('var(--blue)', winnerName);
                winnerName.textContent = playerTwo.name;
                winnerText.textContent = 'Wins!';
                playerTwoScore += 1;
            } else {
                winnerName.textContent = '';
                winnerText.textContent = indicateTheWinner();
            }
            playerOneWins.textContent = `Wins: ${playerOneScore}`;
            smallPlayerOneWins.textContent = playerOneScore;
            opponentWins.textContent = `Wins: ${playerTwoScore}`;
            smallOpponentWins.textContent = playerTwoScore;
    };

    const resetScore = () => {
        playerOneScore = 0;
        playerTwoScore = 0;
        playerOneWins.textContent = `Wins: ${playerOneScore}`;
        smallPlayerOneWins.textContent = playerOneScore;
        opponentWins.textContent = `Wins: ${playerTwoScore}`;
        smallOpponentWins.textContent = playerTwoScore;
    };

    const cleanBoard = () => {
        gameBoard.resetBoard();
        squares.forEach(square => {
            square.replaceChildren();
        });
        // playerTwo.sign is applied to get playerOne.sign in current player
        currentPlayer = playerTwo.sign;
        overlay.style.display = 'none';
        nextRoundBtn.style.display = 'none';
        resetScoreBtn.style.display = 'none';
    };

    const hideElements = () => {
        playground.style.display = 'none';
        playMode.style.display = 'none';
        playerOneInput.style.display = 'none';
        playerTwoInput.style.display = 'none';
        aiLevels.style.display = 'none';
    };

    const goToMenu = () => {
        hideElements();
        playerOneInput.value = '';
        playerTwoInput.value = '';
        menu.style.display = 'flex';
        removeClass('chosen-level', easyLevel, midLevel, hardLevel, 
                    smallPlayerOneInfo, smallOpponentInfo);
        cleanBoard();
    };

    //              BUTTON CLICKS

    twoPlayersMode.addEventListener('click', () => {
        showTwoPlayersPrematch();
        fightBtn.addEventListener('click', () => {
            setNames.twoPlayersNames();
            setColor('var(--blue)', opponentName, opponentWins, smallOpponentWins);
        });
    });

    aiMode.addEventListener('click', () => {
        showAIPrematch();
    });

    easyLevel.onclick = e => animateAILevels(e);
    midLevel.onclick = e => animateAILevels(e);
    hardLevel.onclick = e => animateAILevels(e);

    fightBtn.addEventListener('click', () => {
        playMode.style.display = 'none';
        playground.style.display = 'grid';
        addRemoveClass('chosen-level', playerOneInfo);
        addRemoveClass('chosen-level', smallPlayerOneInfo);
    });
    
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            makeMove(e);
            animatePlayer();
            // if winner is found or it's a tie
            if(indicateTheWinner() !== undefined) {
                showRoundResults();
                nextRoundBtn.style.display = 'flex';
                resetScoreBtn.style.display = 'flex';
                removeClass('chosen-level', smallPlayerOneInfo, smallOpponentInfo,
                             playerOneInfo, opponentInfo);
            }
        });
    });

    nextRoundBtn.addEventListener('click', () => {
        cleanBoard();
        addRemoveClass('chosen-level', playerOneInfo);
        addRemoveClass('chosen-level', smallPlayerOneInfo);
    });

    resetScoreBtn.onclick = () => resetScore();

    goBackBtns.forEach(goBackBtn => {
        goBackBtn.addEventListener('click', goToMenu);
    });

})();