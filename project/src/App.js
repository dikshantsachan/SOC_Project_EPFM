import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './components/Login.js'
import SignUp from './components/SignUp'
import EmployeeHomepage from './components/EmployeeHomepage/EmployeeHomepage';
import ManagerHomepage from './components/ManagerHomepage/ManagerHomepage';
import cookie from 'react-cookies'


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
      console.log("ITS THERE");
      console.log(useremail.email);
      console.log(useremail.decider);
      this.setState({isLogin:true});

      if((useremail.decider)==1)
      this.setState({isadministrator:true})

      else
      this.setState({isadministrator:false})
    }
    else{
      console.log("ITS NOT THERE");
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
        <Route path="/user" render={() => (
          <EmployeeHomepage />
        )} />
        <Route path="/userm" render={() => (
          <ManagerHomepage />
        )} />
      </Router>
      </div>
    )
  }
}

export default App;
