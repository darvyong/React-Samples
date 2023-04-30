import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoListPage';
import Test from './components/TestPage';
import Navbar from "./components/Navbar2";

import './App.css';

function App() {
    const chooseRoute = (
            <Routes>
                <Route path='/' element={<Test/>} />
                <Route path='/todolist' element={<TodoList/>} />
            </Routes>
        )

    return (
        <Router>
            <Navbar content={chooseRoute}/>
        </Router>
    );
}

export default App;