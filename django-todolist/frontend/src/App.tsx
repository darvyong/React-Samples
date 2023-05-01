import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar2";

import './App.css';
import Home from './components/HomePage';
import TodoList from './components/TodoListPage';
import TicTacToeGame from './components/TicTacToePage';
import Sample from './components/SamplePage';
import Products from './components/Products';

function App() {
    const chooseRoute = (
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/todolist' element={<TodoList/>} />
                <Route path='/tictactoe' element={<TicTacToeGame/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/samples' element={<Sample/>} />
            </Routes>
        )

    return (
        <Router>
            <Navbar content={chooseRoute}/>
        </Router>
    );
}

export default App;