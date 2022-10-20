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

const displayController = (() => {
    const playerOne = Player('img/cross.svg', 'X');
    const playerTwo = Player('img/circle-blue.svg', 'O');
    let currentPlayer = playerOne;
    let boardPlayer = playerOne;

    const squares = document.querySelectorAll('.square');

    const handleSquareClick = (e) => {
        const squareID = e.target.id;

        currentPlayer = currentPlayer === playerOne.arraySign ? 
                        playerTwo.arraySign : playerOne.arraySign;
        boardPlayer = boardPlayer === playerOne.boardSign ? 
                      playerTwo.boardSign : playerOne.boardSign;
        
        if(!gameBoard.board[squareID]) {
            const img = document.createElement('img');
            gameBoard.addSignToBoard(squareID, currentPlayer);
            img.setAttribute('src', `${boardPlayer}`);
            e.target.appendChild(img);
        }
    };

    squares.forEach(square => {
        square.addEventListener('click', (e) => {handleSquareClick(e)});
    });
})();