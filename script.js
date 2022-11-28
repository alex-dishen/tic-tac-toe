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
    let AIDifficulty;
    let modeName;
    let currentPlayer;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let opponentTurn = false;
    let opponentStarts = false;

    const getCurrentPlayer = () => {
        if(modeName === 'two-players-mode'){
            currentPlayer = currentPlayer === playerOne.sign ? 
                            playerTwo.sign : playerOne.sign;
        } else if(modeName === 'ai') {
            currentPlayer = currentPlayer === playerOne.sign ? 
                            botPlayer.sign : playerOne.sign;
        }
    };

    const getEmptySpots = (board) => {
        return board.filter(index => {
            return typeof index === 'number'
        });
    };

    const isRobotMove = () => {
        return opponentTurn && modeName === 'ai';
    };

    const getRandomMove = () => {
        const emptySpots = getEmptySpots(gameBoard.board);
        const randomIndex = Math.floor(Math.random() * emptySpots.length);
        return emptySpots[randomIndex]
    };

    const getBestMove = () => {
        const emptySquares = getEmptySpots(gameBoard.board);
        let bestMoveIndex;
        let bestMoveScore = -Infinity;
        let moveScore;
    
        emptySquares.forEach((index) => {
          gameBoard.board[index] = 'img/circle-red.svg';
          moveScore = minimaxScore(gameBoard.board, 0, -Infinity, Infinity, false);
          gameBoard.board[index] = index; // Undo move in board after minimax
          if (moveScore > bestMoveScore) {
            bestMoveScore = moveScore;
            bestMoveIndex = index;
          }
        });
        return bestMoveIndex;
      };
    
      const minimaxScore = (boardState, depth, alpha, beta, isMaximizing) => {
        // Static evalution if game would be over in this state
        const roundResult = indicateTheWinner(boardState);
        if (roundResult !== undefined) return staticEvaluation(roundResult, depth);
    
        // If it's not an ending state, continue minimax recursion
        const emptySquares = getEmptySpots(boardState);
        let moveScore;
        if (isMaximizing) {
          // Maximizing turn
          let bestMoveScore = -Infinity;
          emptySquares.some((index) => {
            boardState[index] = 'img/circle-red.svg';
            moveScore = minimaxScore(boardState, depth + 1, alpha, beta, false);
            boardState[index] = index;
            bestMoveScore = Math.max(bestMoveScore, moveScore);
            // Alpha-beta pruning
            alpha = Math.max(alpha, bestMoveScore);
            if (alpha >= beta) return true; // Prune this branch (stops evaluating other empty squares)
          });
          return bestMoveScore;
        } else {
          // Minimizing turn
          let bestMoveScore = Infinity;
          emptySquares.some((index) => {
            boardState[index] = 'img/cross.svg';
            moveScore = minimaxScore(boardState, depth + 1, alpha, beta, true);
            boardState[index] = index;
            bestMoveScore = Math.min(bestMoveScore, moveScore);
            // Alpha-beta pruning
            beta = Math.min(beta, bestMoveScore);
            if (alpha >= beta) return true; // Prune this branch (stops evaluating other empty squares)
          });
          return bestMoveScore;
        }
      };
    
      const staticEvaluation = (roundResult, depth) => {
        switch (roundResult) {
          case 'img/circle-red.svg':
            return 100 - depth;
          case 'img/cross.svg':
            return -100;
          case 'It\'s a tie':
            return 0;
        }
      };

    const makeRobotMove = () => {
        let robotMove;

        if(AIDifficulty === 'mid') {
            robotMove = getBestMove();
        } else {
            robotMove = getRandomMove();
        }

        setTimeout(() => {
            makeMove(robotMove)
        }, 1400);
    };

    const makeMove = (index) => {
        getCurrentPlayer();
        const img = document.createElement('img');
        img.setAttribute('src', `${currentPlayer}`);
        const square = document.getElementById(`${index}`);
        gameBoard.addSignToBoard(index, currentPlayer);
        square.appendChild(img);
        if(indicateTheWinner(gameBoard.board)) {
            showRoundResults();
        } else {
            animatePlayer();
            opponentTurn = !opponentTurn
            if(isRobotMove()) makeRobotMove();
        }
    };

    const indicateTheWinner = (board) => {
        //'.some' searches for at least one combination that meets our criteria
        //'.every' checks every single combinations number, and if every number
        // inside of any combination contains the same sign it returns 'true',
        // and it means that '.every' found the winning combination.
        const isWinner = gameBoard.winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            })
        });

        const isTie = board.every(index => {
            return typeof index !== 'number';
        })

        if(isWinner) {
            return currentPlayer;
        }

        if(!isWinner && isTie) {
            return 'It\'s a tie'
        }
    };

    //              |||||---------------DISPLAY GAME--------------------|||||

    //          MENU
    const menu = document.querySelector('.menu');
    const modes = document.querySelectorAll('.mode')

    //        PRE-MATCH
    const playMode = document.querySelector('.play-mode');
    const fightBtn = document.querySelector('.fight-button');
    const goBackBtns = document.querySelectorAll('.go-back');
    const aiLevels = document.querySelector('.ai-levels');
    const easyLevel = document.querySelector('.easy');
    const midLevel = document.querySelector('.mid');

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
    const aiLevel = document.getElementById('level');
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
        playerOneInput.style.display = 'block';
        playerTwoInput. style.display = 'block';
        opponentFaces.forEach(face => {
            face.setAttribute('src', `${playerTwo.face}`);
        });

        opponentSigns.forEach(sign => {
            sign.setAttribute('src', `${playerTwo.sign}`);
        });
    };

    const showAIPrematch = () => {
        aiLevels.style.display = 'flex'
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
            addRemoveClass('chosen-level', easyLevel, midLevel);
        } else if(e.target.dataset.name === 'mid') {
            addRemoveClass('chosen-level', midLevel, easyLevel);
        }
    };

    const setNames = (() => {
        const twoPlayersNames = () => {
            playerOne.name = playerOneInput.value || 'Player 1';
            playerTwo.name = playerTwoInput.value || 'Player 2';
            aiLevel.style.display = 'none';
            opponentName.style.display = 'block';
            playerOneName.textContent = playerOne.name;
            opponentName.textContent = playerTwo.name;
        };

        const aiNames = () => {
            playerOne.name = 'Human';
            playerOneName.textContent = playerOne.name;
            opponentName.style.display = 'none';
            aiLevel.style.display = 'block';
        };

        return { twoPlayersNames, aiNames };
    })();

    const setColor = (color, ...elements) => {
        elements.forEach(element => {
            element.style.color = color;
        });
    };

    const setAILevel = () => {
        // If user switches from one level to another without refreshing the page
        //the previous class that was added has to be removed
        aiLevel.removeAttribute('class');
        if(easyLevel.classList.contains('chosen-level')) {
            addRemoveClass('easy', aiLevel);
            aiLevel.textContent = 'EASY';
        } else if(midLevel.classList.contains('chosen-level')) {
            addRemoveClass('mid', aiLevel);
            aiLevel.textContent = 'MID';
        } else {
            addRemoveClass('easy', aiLevel);
            aiLevel.textContent = 'EASY';
        }
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
        removeClass('chosen-level', playerOneInfo, opponentInfo, smallPlayerOneInfo, smallOpponentInfo);
        overlay.style.display = 'flex';
        nextRoundBtn.style.display = 'flex';
        resetScoreBtn.style.display = 'flex';
        if(indicateTheWinner(gameBoard.board) === playerOne.sign) {
            setColor('var(--purple)', winnerName);
            winnerName.textContent = playerOne.name;
            winnerText.textContent = 'Wins!';
            playerOneScore += 1;
        } else if(indicateTheWinner(gameBoard.board) === playerTwo.sign){
            setColor('var(--blue)', winnerName);
            winnerName.textContent = playerTwo.name;
            winnerText.textContent = 'Wins!';
            playerTwoScore += 1;
        } else if(indicateTheWinner(gameBoard.board) === botPlayer.sign) {
            setColor('var(--red)', winnerName);
            winnerName.textContent = 'Robot';
            winnerText.textContent = 'Wins!';
            playerTwoScore += 1;
        } else if (indicateTheWinner(gameBoard.board) === 'It\'s a tie'){
            winnerName.textContent = '';
            winnerText.textContent = indicateTheWinner(gameBoard.board);
        }
        playerOneWins.textContent = `Wins: ${playerOneScore}`;
        smallPlayerOneWins.textContent = playerOneScore;
        opponentWins.textContent = `Wins: ${playerTwoScore}`;
        smallOpponentWins.textContent = playerTwoScore;
    };

    const changePlayerTurn = () => {
        if(modeName === 'ai') {
            opponentStarts = !opponentStarts;
            opponentTurn = opponentStarts;
            if(isRobotMove()) {
                currentPlayer = playerOne.sign;
                makeRobotMove();
            } else if(!isRobotMove()){
                currentPlayer = botPlayer.sign;
            }
        } else {
            if(opponentTurn) {
                currentPlayer = playerOne.sign;
                opponentTurn = false;
            } else if(!opponentTurn) {
                currentPlayer = playerTwo.sign;
                opponentTurn = true;
            }
        }
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
        menu.style.display = 'flex';
        playerOneInput.value = '';
        playerTwoInput.value = '';
        removeClass('chosen-level', easyLevel, midLevel, smallPlayerOneInfo,
                                    smallOpponentInfo);
        // playerTwo.sign is applied to get playerOne.sign in current player
        currentPlayer = '';
        opponentStarts = false;
        opponentStarts = false;
        hideElements();
        cleanBoard();
        resetScore();
    };

    //              BUTTON CLICKS
    modes.forEach(mode => {
        mode.addEventListener('click', () => {

            modeName = mode.getAttribute('data-mode');
            menu.style.display = 'none';
            playMode.style.display = 'flex';

            if(modeName === 'two-players-mode') {
                showTwoPlayersPrematch();
                fightBtn.addEventListener('click', () => {
                    //to start the right counting of player's turn
                    opponentTurn = true;
                    setNames.twoPlayersNames();
                    setColor('var(--blue)', opponentName, opponentWins, smallOpponentWins);
                });
            } else if(modeName === 'ai') {
                showAIPrematch();
                fightBtn.addEventListener('click', () => {
                    //to start the right counting of player's turn after two-players-mode
                    //was chosen
                    opponentTurn = false;
                    setNames.aiNames();
                    setColor('var(--red)', opponentWins, smallOpponentWins);
                    setAILevel();
                });
            }
        });
    });

    easyLevel.addEventListener('click', (e) => {
        AIDifficulty = 'easy'
        animateAILevels(e);
    });

    midLevel.addEventListener('click', (e) => {
        AIDifficulty = 'mid'
        animateAILevels(e);
    });

    fightBtn.addEventListener('click', () => {
        playMode.style.display = 'none';
        playground.style.display = 'grid';
        addRemoveClass('chosen-level', playerOneInfo);
        addRemoveClass('chosen-level', smallPlayerOneInfo);
    });
    
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            const squareIndex = e.target.id;
            // If !isRobotMove() is omitted at this stage then while the bot is 'thinking'
            //about his move a player can freely place the mark instead of a bot
            if(typeof gameBoard.board[squareIndex] === 'number' && !isRobotMove()) {
                makeMove(squareIndex);
            }
        });
    });

    nextRoundBtn.addEventListener('click', () => {
        cleanBoard();
        changePlayerTurn();
        animatePlayer();
    });

    resetScoreBtn.onclick = () => resetScore();

    goBackBtns.forEach(goBackBtn => {
        goBackBtn.addEventListener('click', goToMenu);
    });
})();