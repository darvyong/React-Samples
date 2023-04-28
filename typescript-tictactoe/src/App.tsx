import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface SwitchProps {
    color: string;
    isChecked: boolean;
    onToggle: () => void;
}

function Switch({ color, isChecked, onToggle } : SwitchProps ) {
    if (!isChecked) {
        color = "";
    }
    return (
        <>
            <input className="react-switch-checkbox"
                   checked={isChecked}
                   onChange={onToggle}
                   id={`react-switch-new`}
                   type="checkbox" />
            <label style={{ background: color }}
                   className="react-switch-label"
                   htmlFor={`react-switch-new`} >
                <span className={`react-switch-button`} />
            </label>
        </>
    )
}

interface SquareProps { 
    value: string;
    onSquareClick: () => void;
    highlight: boolean;
    color: string;
}

function Square({ value, onSquareClick, highlight, color } : SquareProps ) {
    if (!highlight) {
        color = "";
    }
    return (
        <button className="square"
                style={{ background: color }}
                onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return [];
}

interface BoardProps {
    xIsNext: boolean;
    squares: string[];
    onPlay: (squares: string[]) => void;
    currentIndex: number;
}

function Board({ xIsNext, squares, onPlay, currentIndex } : BoardProps) {
    const winner: number[] = calculateWinner(squares);
    let status;
    if (winner.length > 0) {
        status = "Winner: " + squares[winner[0]];
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(index: number) {
        if (calculateWinner(squares).length > 0 || squares[index]) {
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
                    const box: number = row * 3 + col;
                    let highlighted: boolean = false;
                    let color = "#EF476F";
                    if (winner.length > 0) {
                        highlighted = winner.includes(box)
                    }else if (currentIndex === box) {
                        highlighted = true;
                        color = "#A7F542"
                    }
                    return <Square value={squares[box]} 
                                   onSquareClick={() => handleClick(box)} 
                                   color={color}
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

    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function getIndexChange(prevSquares: string[], currentSquares: string[]) {
        for (let i = 0; i < currentSquares.length; i++){
            if (prevSquares[i] !== currentSquares[i]) {
                return i;
            }
        }
        return -1;
    }

    const currentIndex: number = (currentMove > 0) ? getIndexChange(history[currentMove-1], history[currentMove]): -1;

    const moves = history.map((squares, index) => {
        const move = ascending ? index : history.length -1 - index;

        let description;
        if (move > 0) {
            const changedIndex: number = getIndexChange(history[index-1], history[index])
            const pos: number[] = [Math.floor(changedIndex/3)+1, changedIndex%3+1]
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
                       onPlay={handlePlay} currentIndex={currentIndex}/>
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
                <img src={logo} 
                    className="App-logo" alt="logo" />
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
