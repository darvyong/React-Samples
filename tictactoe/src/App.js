import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Switch({color, isChecked, onToggle}) {
    return (
        <>
            <input className="react-switch-checkbox"
                   checked={isChecked}
                   onChange={onToggle}
                   id={`react-switch-new`}
                   type="checkbox" />
            <label style={{ background: isChecked && color }}
                   className="react-switch-label"
                   htmlFor={`react-switch-new`} >
                <span className={`react-switch-button`} />
            </label>
        </>
    )
}

function Square({ value, onSquareClick, highlight, color }) {
    return (
        <button className="square"
                style={{ background: highlight && color }}
                onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}

function Board({ xIsNext, squares, onPlay, currentMove }) {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner[0];
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(index) {
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }
        onPlay(nextSquares);
    }
    
    const tictacrow = [0, 1, 2].map(row => {
        return (
            <div className="board-row">
                {[0, 1, 2].map(col => {
                    const box = row * 3 + col;
                    const highlighted = winner && winner[1].includes(box)
                    return <Square value={squares[box]} 
                                   onSquareClick={() => handleClick(box)} 
                                   color="#EF476F"
                                   highlight={highlighted} />
                })}
            </div>
        );
    });

    return (
        <>
            <div className="status">{status}</div>
            {tictacrow}
        </>
    );
}


function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [ascending, setAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handleSwitch(){
        setAscending(!ascending)
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function getIndexChange(prevSquares, currentSquares) {
        for (let i = 0; i < currentSquares.length; i++){
            if (prevSquares[i] !== currentSquares[i]) {
                return i;
            }
        }
    }

    const moves = history.map((squares, index) => {
        const move = ascending ? index : history.length -1 - index;

        let description;
        if (move > 0) {
            const changedIndex = getIndexChange(history[index-1], history[index])
            const pos = [parseInt(changedIndex/3)+1, changedIndex%3+1]
            if (move === currentMove) {
                return (
                    <li key={move}>
                        <p>You are at move no. {move} ({pos[0]}, {pos[1]}).</p>
                    </li>
                );
            }   
            description = 'Go to move #' + move + ' (' + pos[0] + ', ' + pos[1] + ')';
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} 
                       onPlay={handlePlay} currentMove={currentMove} />
            </div>
            <div className="game-info">
                <Switch color="#EF476F" isChecked={ascending} 
                        onToggle={handleSwitch} />
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                React TicTacToe App
            </p>
        </header>
        <body>
            <Game />
        </body>
        </div>
    );
}

export default App;
