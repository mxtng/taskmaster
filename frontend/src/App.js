import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import TasksPage from './pages/TasksPage/TasksPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/tasks' component={TasksPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
