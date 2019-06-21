import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/">EPFM</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">SignUp</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
