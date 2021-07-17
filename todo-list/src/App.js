import logo from './logo.svg';
import './App.css';
import { TodoPage } from './Pages/TodoPage'
import { Show } from './Pages/Show'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className="App">
            <TodoPage/>
          </div>
        </Route>
        <Route exact path='/:id'>
          <div className="App">
            <Show/>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
