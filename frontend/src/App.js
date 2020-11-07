import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import TasksPage from './pages/TasksPage/TasksPage';
import LoginPage from './pages/LoginPage/LoginPage';

import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/tasks' component={TasksPage} />
        <Route exact path='/login' component={LoginPage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
