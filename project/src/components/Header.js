import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'


class Header extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand href="/">EPFM</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">SignUp</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header

