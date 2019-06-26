import React from 'react';
import './App.css';
import Homepage from './components/Homepage.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        {/*<HeaderAfterLogin />
        <EmployeeHomepage />*/}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
=======
      <Router>
        <div className="App">
          <Switch>
           <Route path="/" component={Homepage} />
          </Switch>
>>>>>>> a7459d47f2b411ede6e2d3a40f5ce804f919e3bc
      </div>
      </Router>
  );
}

export default App;
