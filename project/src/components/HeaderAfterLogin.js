import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import DrawerToggleButton from './SideDrawer/DrawerToggleButton'
import cookie from 'react-cookies';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from '/home/sajal/deleteit6/project/src/App.js';




class EmployeeHeaderAfterLogin extends Component {

    constructor(props) {
        super(props)
        this.routeChange = this.routeChange.bind(this)
    }

    routeChange() {
        cookie.remove("userId")
    }
    
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    {/*<div><DrawerToggleButton />click={this.props.drawerClickHandler}</div>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>Home</Nav.Link>
                        </Nav>
                        <Nav.Link href="/aboutus">About Us</Nav.Link>
                        <Nav.Link href='/' onClick={this.routeChange}>LogOut</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <Route path="/" exact={true} render={() => (
                    <App />
                    )} />
                </Router>
            </div>
        )
    }
}

export default EmployeeHeaderAfterLogin