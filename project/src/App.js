import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header.js'
import Login from './components/Login.js'
import SignUp from './components/SignUp.js'
import HeaderAfterLogin from './components/HeaderAfterLogin';
import EmployeeHomepage from './components/EmployeeHomepage/EmployeeHomepage';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderAfterLogin />
        <EmployeeHomepage />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
