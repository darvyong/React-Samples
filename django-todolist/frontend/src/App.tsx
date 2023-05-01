import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar2";

import './App.css';
import Home from './components/HomePage';
import TodoList from './components/TodoListPage';
import TicTacToeGame from './components/TicTacToePage';

function App() {
    const chooseRoute = (
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/todolist' element={<TodoList/>} />
                <Route path='/tictactoe' element={<TicTacToeGame/>} />
            </Routes>
        )

    return (
        <Router>
            <Navbar content={chooseRoute}/>
        </Router>
    );
}

export default App;