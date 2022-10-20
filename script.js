const Player = (boardSign, arraySign) => {
    return { boardSign, arraySign };
}

const gameBoard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];

    const addSignToBoard = (index, sign) => {
        board[index] = sign;
    };

    return { board, addSignToBoard };
})();

const gameController = (() => {
    const playerOne = Player('img/cross.svg', 'X');
    const playerTwo = Player('img/circle-blue.svg', 'O');
    let currentPlayer = playerOne;
    let boardPlayer = playerOne;

    const squares = document.querySelectorAll('.square');

    const handleSquareClick = (e) => {
        let squareIndex = e.target.id;
        
        if(!gameBoard.board[squareIndex]) {
            currentPlayer = currentPlayer === playerOne.arraySign ? 
                            playerTwo.arraySign : playerOne.arraySign;
            boardPlayer = boardPlayer === playerOne.boardSign ? 
                          playerTwo.boardSign : playerOne.boardSign;
            const img = document.createElement('img');
            gameBoard.addSignToBoard(squareIndex, currentPlayer);
            img.setAttribute('src', `${boardPlayer}`);
            e.target.appendChild(img);
        }

        setWinner(currentPlayer);
    };

    const setWinner = (player) => {
        if(gameBoard.board[0] === player){
            if(gameBoard.board[1] === player && gameBoard.board[2] === player) {
                console.log('you won')
            }
            if(gameBoard.board[3] === player && gameBoard.board[6] === player) {
                console.log('you won')
            }
            if(gameBoard.board[4] === player && gameBoard.board[8] === player) {
                console.log('you won')
            }
        }
        if(gameBoard.board[2] === player){
            if(gameBoard.board[5] === player && gameBoard.board[8] === player) {
                console.log('you won')
            }
            if(gameBoard.board[4] === player && gameBoard.board[6] === player) {
                console.log('you won')
            }
        }
        if(gameBoard.board[7] === player){
            if(gameBoard.board[6] === player && gameBoard.board[8] === player) {
                console.log('you won')
            }
            if(gameBoard.board[4] === player && gameBoard.board[1] === player) {
                console.log('you won')
            }
        }
        if(gameBoard.board[3] === player){
            if(gameBoard.board[4] === player && gameBoard.board[5] === player) {
                console.log('you won')
            }
        }
    };

    squares.forEach(square => {
        square.addEventListener('click', (e) => {handleSquareClick(e)});
    });
})();