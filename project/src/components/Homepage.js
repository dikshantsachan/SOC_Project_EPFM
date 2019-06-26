import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderAfterLogin from './HeaderAfterLogin';
import EmployeeHomepage from './EmployeeHomepage/EmployeeHomepage';
import Login from './Login.js'
import SignUp from './SignUp.js'

class Homepage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isLogin: false,
             administrator: true
        }
    }
    
    render() {
        let data = ""
        if(this.state.isLogin) {
            if (!this.state.administrator)
            {
                data = (
                    <div>
                        <HeaderAfterLogin />
                        <EmployeeHomepage />
                    </div>
                )
            }
            else {
                data = (
                    <h1>this is manager's homepage</h1>
                )
            }
        }
        else {
            data = (
                <Router>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Brand href="/">EPFM</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">SignUp</Nav.Link>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                    </Switch>
                </Router>
            )
        }
        return (
            <div>{data}</div>
        )
    }
}

export default Homepage