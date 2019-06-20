import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">EPFM</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">SignUp</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
