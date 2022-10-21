const Player = (boardSign, arraySign) => {
    return { boardSign, arraySign };
}

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

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
    let currentPlayer;
    let boardPlayer;

    const squares = document.querySelectorAll('.square');

    const handleSquareClick = (e) => {
        // e.target === square user clicked
        const squareIndex = e.target.id;
        
        if(gameBoard.board[squareIndex] === '') {
            currentPlayer = currentPlayer === playerOne.arraySign ? 
                             playerTwo.arraySign : playerOne.arraySign;
            boardPlayer = boardPlayer === playerOne.boardSign ? 
                           playerTwo.boardSign : playerOne.boardSign;
            const img = document.createElement('img');
            gameBoard.addSignToBoard(squareIndex, currentPlayer);
            img.setAttribute('src', `${boardPlayer}`);
            e.target.appendChild(img);
        }

        findTheWinner();
    };

    const findTheWinner = () => {
        //'.some' searches for at least one combination that meets our criteria
        //'.every' checks every single combinations number, and if every number
        // inside of any combination contains the same sign it returns 'true',
        // and it means that '.every' found the winning combination.
        const winner = gameBoard.winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard.board[index] === currentPlayer;
            })
        });

        if(winner) {
            console.log('Winner')
        }
    };

    squares.forEach(square => {
        square.addEventListener('click', (e) => {handleSquareClick(e)});
    });
})();