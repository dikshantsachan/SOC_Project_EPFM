import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './components/Login.js'
import SignUp from './components/SignUp'
import EmployeeHomepage from './components/EmployeeHomepage/EmployeeHomepage';
import ManagerHomepage from './components/ManagerHomepage/ManagerHomepage';
import cookie from 'react-cookies'
import ChatBox from './components/ChatBox/ChatBox.jsx'


class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isLogin: false,
       isadministrator: false
    }
  }
  


  componentWillMount()
  {
    var  useremail = cookie.load('userId');
    

    if(useremail)
    {
      this.setState({isLogin:true});

      if((useremail.decider)===1)
      this.setState({isadministrator:true})

      else
      this.setState({isadministrator:false})
    }
    else{
      this.setState({isLogin:false});
    }
  }




  render() {
    return (
      <div className="App">
        <Router>
        <Route path="/" exact render={() => (
          <Homepage isLogin={this.state.isLogin} isadministrator={this.state.isadministrator} />
        )} />
        <Route path="/login" render={() => (
          !this.state.isLogin ? (<Login />) : (<Redirect to="/" />)
        )} />
        <Route path="/signup" render={() => (
          !this.state.isLogin ? (<SignUp />) : (<Redirect to="/" />)
        )} />
        <Route path="/user" exact render={() => (
          <EmployeeHomepage />
        )} />
        <Route path="/userm" exact render={() => (
          <ManagerHomepage />
        )} />
        <Route path='/ChatBox' exact render={() => (
          <ChatBox />
        )} />
      </Router>
      </div>
    )
  }
}

export default App;
