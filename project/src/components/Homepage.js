import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderAfterLogin from './HeaderAfterLogin';
import EmployeeHomepage from './EmployeeHomepage/EmployeeHomepage';
import Login from './Login.js';
import SignUp from './SignUp.js';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';

class Homepage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isLogin: true,
             administrator: false,
             sideDrawerOpen: false
        }
    }
    
    drawerToggleClickHandler = () => {
        this.setState({
            sideDrawerOpen: !this.state.sideDrawerOpen
        });
    }; 
    
    backdropClickHandler = () => {
        this.setState({
            sideDrawerOpen: false
        });
    };
    
    render() {
        let sideDrawer;
        let backdrop;

        if(this.state.sideDrawerOpen){
            sideDrawer = <SideDrawer />;
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }

        let data = ""
        if(this.state.isLogin) {
            if (!this.state.administrator)
            {
                data = (
                    <div>
                        <HeaderAfterLogin drawerClickHandler={this.drawerToggleClickHandler}/>
                        <EmployeeHomepage />
                        {sideDrawer}
                        {backdrop}
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