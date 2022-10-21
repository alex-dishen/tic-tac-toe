const Player = (sign, face) => {
    return { sign, face };
}

const gameBoard = (() => {
    // The array contains numbers instead of ['', ''] && [null, null] to way
    //easier find an index to put the sign under, when the bot makes his choice
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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

    return { board, addSignToBoard, winningCombinations };
})();

const gameController = (() => {

    // const createPlayer = (() => {
    const playerOne = Player('img/cross.svg', 'img/player.svg');
    // return {playerOne};
    // })();
    const playerTwo = Player('img/circle-blue.svg', 'img/player-blue.svg');
    const botPlayer = Player('img/circle-red.svg', 'img/robot.svg');
    let currentPlayer;

    const squares = document.querySelectorAll('.square');

    const handleSquareClick = (e) => {
        // e.target === square user clicked
        const squareIndex = e.target.id;
        
        if(typeof gameBoard.board[squareIndex] === 'number') {
            currentPlayer = 
                currentPlayer === playerOne.sign ? playerTwo.sign : playerOne.sign;
            const img = document.createElement('img');
            gameBoard.addSignToBoard(squareIndex, currentPlayer);
            img.setAttribute('src', `${currentPlayer}`);
            e.target.appendChild(img);
            // randomBotMove();
        }

        console.log(indicateTheWinner())
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
            return `${currentPlayer}`;
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

    squares.forEach(square => {
        square.addEventListener('click', (e) => {handleSquareClick(e)});
    });

    return {playerOne, playerTwo}
})();

const displayController = (() => {
    //          MENU
    const menu = document.querySelector('.menu');
    const twoPlayersMode = document.querySelector('.two-players-mode');
    const aiMode = document.querySelector('.ai-mode');

    //        PRE-MATCH
    const playMode = document.querySelector('.play-mode');
    const fightBtn = document.querySelector('.fight-button');
    const goBackBtns = document.querySelectorAll('.go-back');

    //      PLAYERS ATTRIBUTES
    const playerOneInput = document.querySelector('.player-1-input');
    const playerTwoInput = document.querySelector('.player-2-input');
    const opponentFace = document.querySelector('.opponent-face');
    const opponentSign = document.querySelector('.opponent-sign');

    //         PLAYGROUND
    const playground = document.querySelector('.playground');

    const showTwoPlayersPrematch = () => {
        menu.style.display = 'none';
        playMode.style.display = 'flex';
        playerOneInput.style.display = 'block';
        playerTwoInput. style.display = 'block';
        opponentFace.setAttribute('src', `${gameController.playerTwo.face}`);
        opponentSign.setAttribute('src', `${gameController.playerTwo.sign}`);
    };

    const showTwoPlayersPlayground = () => {
        playMode.style.display = 'none';
        playground.style.display = 'grid';
    };

    const goToMenu = () => {
        // if statements are needed here so that playground doesn't get touched
        //if it wasn't even opened
        if(playground.style.display === 'grid') {
            playground.style.display = 'none';
        }
        if(playMode.style.display === 'flex') {
            playMode.style.display = 'none';
        }
        playerOneInput.value = '';
        playerTwoInput.value = '';
        menu.style.display = 'flex';
    };

    twoPlayersMode.addEventListener('click', () => {
        showTwoPlayersPrematch();
        fightBtn.addEventListener('click', showTwoPlayersPlayground);
    });

    goBackBtns.forEach(goBackBtn => {
        goBackBtn.addEventListener('click', goToMenu);
    });
})();