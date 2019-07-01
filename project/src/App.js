import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './components/Login.js'
import SignUp from './components/SignUp'
import EmployeeHomepage from './components/EmployeeHomepage/EmployeeHomepage';
import ManagerHomepage from './components/ManagerHomepage/ManagerHomepage';


class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isLogin: false
    }
  }

  /**/
  
  render() {
    return (
      <div className="App">
              <Router>
        <Route path="/" exact render={() => (
          <Homepage isLogin={this.state.isLogin} />
        )} />
        <Route path="/login" render={() => (
          !this.state.isLogin ? (<Login />) : (<Redirect to="/" />)
        )} />
        <Route path="/signup" render={() => (
          !this.state.isLogin ? (<SignUp />) : (<Redirect to="/" />)
        )} />
        <Route path="/user" render={() => (
          <EmployeeHomepage />
        )} />
      </Router>
      </div>
    )
  }
}

export default App;
