import React, { Component } from 'react'
import { Navbar} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import HeaderAfterLogin from './HeaderAfterLogin';
import EmployeeHomepage from './EmployeeHomepage/EmployeeHomepage';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import Login from './Login.js';
import SignUp from './SignUp.js';

class Homepage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isLogin: this.props.isLogin,
             administrator: false,
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
                        <HeaderAfterLogin
                            drawerClickHandler={this.drawerToggleClickHandler}
                            handleLog={this.handleLog} />
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
                            <Link to="/login">Login</Link>
                            <Link to="/signup">SignUp</Link>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route path="/login" exact render={() => (
                        !this.state.isLogin ? ( <Login /> ) : ( <Redirect to="/" /> )
                    )} />
                    <Route path="/signup" exact render={() => (
                        !this.state.isLogin ? (<SignUp />) : (<Redirect to="/" />)
                    )} />
                    <Route path="/user" render={() => (
                        <EmployeeHomepage />
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
