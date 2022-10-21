const Player = (boardSign, arraySign) => {
    return { boardSign, arraySign };
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
    const playerOne = Player('img/cross.svg', 'X');
    const playerTwo = Player('img/circle-blue.svg', 'O');
    const botPlayer = Player('img/circle-red.svg', 'O');
    let currentPlayer;
    let UIPlayer;

    const squares = document.querySelectorAll('.square');

    const handleSquareClick = (e) => {
        // e.target === square user clicked
        const squareIndex = e.target.id;
        
        if(typeof gameBoard.board[squareIndex] === 'number') {
            // currentPlayer = currentPlayer === playerOne.arraySign ? 
            //                  playerTwo.arraySign : playerOne.arraySign;
            // UIPlayer = UIPlayer === playerOne.boardSign ? 
            //                playerTwo.boardSign : playerOne.boardSign;
            const img = document.createElement('img');
            gameBoard.addSignToBoard(squareIndex, /*currentPlayer*/ playerOne.arraySign);
            img.setAttribute('src', `${/*UIPlayer*/ playerOne.boardSign}`);
            e.target.appendChild(img);
            randomBotMove();
        }

        indicateTheWinner();
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
            return index !== '';
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

        gameBoard.addSignToBoard(emptySpots[randomIndex], botPlayer.arraySign);
        const square = document.getElementById(`${emptySpots[randomIndex]}`);
        img.setAttribute('src', `${botPlayer.boardSign}`);
        square.appendChild(img);
    };

    squares.forEach(square => {
        square.addEventListener('click', (e) => {handleSquareClick(e)});
    });
})();

const displayController = (() => {})();