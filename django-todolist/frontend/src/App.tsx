import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoListPage';
import Test from './components/TestPage';

import './App.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Test/>} />
                <Route path='/todolist' element={<TodoList/>} />
            </Routes>
        </Router>
    );
}

export default App;