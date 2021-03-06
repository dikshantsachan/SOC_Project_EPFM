import React, { Component } from 'react'
import { Navbar, Nav, Jumbotron, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import EmployeeHomepage from './EmployeeHomepage/EmployeeHomepage';
import ManagerHomepage from './ManagerHomepage/ManagerHomepage';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import Login from './Login.js';
import SignUp from './SignUp.js';
import ChatBox from './ChatBox/ChatBox.jsx'

class Homepage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isLogin: this.props.isLogin,
             administrator: this.props.isadministrator,
             sideDrawerOpen: false
        }
    }
    
    drawerToggleClickHandler = () => {
        this.setState({
            sideDrawerOpen: !this.state.sideDrawerOpen
        })
    }
    
    backdropClickHandler = () => {
        this.setState({
            sideDrawerOpen: false
        })
    }

    handleLog = () => {
        return (
            this.setState({
                isLogin: !this.state.isLogin
            })
        )
    }
    
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
                    <Redirect to="/user" />
                    </div>
                )
            }
            else {
                data = (
                    <div>
                    <Redirect to="/userm" />
                    </div>
                    
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
                    <Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>
                            Welcome to EPFM
                        </p>
                    </Jumbotron>
                    <Route path="/login" exact render={() => (
                        !this.state.isLogin ? ( <Login /> ) : ( <Redirect to="/" /> )
                    )} />
                    <Route path="/signup" exact render={() => (
                        !this.state.isLogin ? (<SignUp />) : (<Redirect to="/" />)
                    )} />
                    <Route path="/user" render={() => (
                    <EmployeeHomepage />
                    )} />
                    <Route path="/userm" render={() => (
                    <ManagerHomepage />
                    )} />
                    <Route path='/ChatBox' exact={true} render={() => (
                    <ChatBox />
                    )} />
                </Router>
            )
        }
        return (
            <div>{data}</div>
        )
    }
}

export default Homepage