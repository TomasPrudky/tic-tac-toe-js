// minimax.js

export const calculateWinner = (squares) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of winningCombinations) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }    
    }

    if (!squares.includes(null)) return 'T';

    return null;
};

const minimax = (squares, depth, isMaximizing) => {
    const winner = calculateWinner(squares);
    if (winner === 'X') return 1;
    if (winner === 'O') return -1; 
    if (winner === 'T') return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                squares[i] = 'X';
                const score = minimax(squares, depth + 1, false);
                squares[i] = null; 
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                squares[i] = 'O'; 
                const score = minimax(squares, depth + 1, true);
                squares[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

export const findBestMove = (squares) => {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            squares[i] = 'O';
            if (calculateWinner(squares) === 'O') {
                squares[i] = null;
                return i;
            }
            squares[i] = null;
        }
    }

    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            squares[i] = 'X';
            if (calculateWinner(squares) === 'X') {
                squares[i] = null; 
                return i;
            }
            squares[i] = null;
        }
    }

    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            squares[i] = 'X';
            const score = minimax(squares, 0, false);
            squares[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
};
