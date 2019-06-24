import React from 'react';
import './App.css';
import Homepage from './components/Homepage.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
           <Route path="/" component={Homepage} />
          </Switch>
      </div>
      </Router>
  );
}

export default App;
