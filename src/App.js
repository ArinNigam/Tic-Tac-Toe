import { useState } from 'react';
import circle from './Assets/circle.png';
import cross from './Assets/cross.png';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value === 'X' && <img src={cross} alt="X" />}
      {value === 'O' && <img src={circle} alt="O" />}
    </button>
  );
}

  
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
   
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  console.log(xIsNext);
  if (winner) {
    status=(
      <div className='flex justify-items-center font-semibold text-green-500 text-lg' >
        Winner: <img className='w-8 h-8 ' flex items-center src={winner==='X' ? cross : circle} alt={winner}/>
      </div>
    );
  } else {
    status = (
      <div className='flex justify-items-center font-semibold text-blue-400 text-lg'>
        Next player: <img className='w-8 h-8 ' src={xIsNext===true ? cross : circle} alt={xIsNext===true ? 'X' : 'O'}/>
      </div>
    );
    
  }

  return (
    <>
       <div className="text-2xl">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = (move===0) ? 'Start' : 'Reset';
    }
    return (
      <li >
        <button className = "bg-blue-500 hover:bg-blue-700 text-bold px-10 py-2 m-2 rounded-2xl" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
    <h1 className='text-center font-bold font-roboto text-yellow-400 m-10 '>Tic Tac Toe</h1>
    <div className="game">
      <div className="game-board" >
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  );
}

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
