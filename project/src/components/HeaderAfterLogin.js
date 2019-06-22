import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

class EmployeeHeaderAfterLogin extends Component {

    handleLogOut = () => {
        alert(`You have successfully logged out`)
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                        <Nav.Link href="/aboutus">About Us</Nav.Link>
                        <Nav.Link href='#' onClick={this.handleLogOut}>LogOut</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default EmployeeHeaderAfterLogin