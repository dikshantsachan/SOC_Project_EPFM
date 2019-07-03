import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import DrawerToggleButton from './SideDrawer/DrawerToggleButton'


class EmployeeHeaderAfterLogin extends Component {

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                <div><DrawerToggleButton click={this.props.drawerClickHandler}/></div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>Home</Nav.Link>
                        </Nav>
                        <Nav.Link href="/aboutus">About Us</Nav.Link>
                        <Nav.Link href='#' onClick={this.props.handleLog}>LogOut</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default EmployeeHeaderAfterLogin