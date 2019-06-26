import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header.js'
import Login from './components/Login.js'
import SignUp from './components/SignUp.js'
import HeaderAfterLogin from './components/HeaderAfterLogin';
import EmployeeHomepage from './components/EmployeeHomepage/EmployeeHomepage';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }; 

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render (){
    let sideDrawer;
    let backdrop;

    if(this.state.sideDrawerOpen){
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <Router>
        <div className="App">
          <Header />
          { /* <HeaderAfterLogin drawerClickHandler={this.drawerToggleClickHandler} />
          <EmployeeHomepage />
          {sideDrawer}
          {backdrop}
    */ }
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
    
        </div>
      </Router>
    );
  }  
}

export default App;
