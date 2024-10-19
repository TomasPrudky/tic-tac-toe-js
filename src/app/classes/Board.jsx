"use client";
import { useState, useEffect } from 'react';
import Square from './Square';
import { findBestMove } from './logic/Minimax';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [startWithX, setStartWithX] = useState(true);

  const winner = calculateWinner(squares);
  let status = winner === 'T' ? `Draw` : winner ? `Winner: ${winner}` : `Player on turn: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (squares[index] || !isUserTurn) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';

    setSquares(newSquares);
    setIsXNext(!isXNext);
    setIsUserTurn(false);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(startWithX);
    setIsUserTurn(startWithX);
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      if (winner === 'X') {
        setUserScore(userScore + 1);
        setStartWithX(false);
      } else if (winner === 'O') {
        setComputerScore(computerScore + 1);
        setStartWithX(true);
      }

      const timer = setTimeout(() => {
        restart();
      }, 2000);
      
      return () => clearTimeout(timer);
    }

    if (!isXNext) {
      setTimeout(() => {
        const bestMove = findBestMove(squares);
        const newSquares = squares.slice();
        newSquares[bestMove] = 'O';

        setSquares(newSquares);
        setIsXNext(true);
        setIsUserTurn(true);
      }, 500);
    }
  }, [squares, isXNext]);

function calculateWinner(squares) {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
}

  const renderSquare = (index) => (
    <Square
      key={index}
      value={squares[index]}
      onClick={() => handleClick(index)}
    />
  );

  return (
    <div style={{ textAlign: 'center' }}>
        <h2 style={{ textAlign: 'center', margin: '10px 20px 10px 10px', fontStyle: 'italic' }}>{status}</h2>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'inline-block', marginRight: '20px' }}>
                <strong>User:</strong> {userScore}
            </div>
            <div style={{ display: 'inline-block' }}>
                <strong>Computer:</strong> {computerScore}
            </div>
        </div>
        <div style={{ margin: 'auto', display: 'inline-block' }}>
            <div style={{ display: 'flex' }}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div style={{ display: 'flex' }}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div style={{ display: 'flex' }}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div className="resetBoard" onClick={restart}>
                <span className="reset">↻</span>
            </div>
        </div>
    </div>
  );
};

export default Board;
