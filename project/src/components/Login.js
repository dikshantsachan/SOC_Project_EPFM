import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import './Login.css'
import Homepage from './Homepage.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            administrator: false
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleCheck = () => {
        this.setState({
            administrator: !this.state.administrator
        })
    }
    
    handleSubmit = (event) => {
        var user = {
            email: this.state.email,
            password: this.state.password
        }

        fetch('http://localhost:3001/login',
        {
            method: 'POST',
            body: JSON.stringify(user),

            headers:{
                'Content-Type':'application/json'
            }
        }
    )
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error(error));
    event.preventDefault()

    }

    render() {
        return (
            <div className="first">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalCheck">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check
                                label="Administrator"
                                onChange={this.handleCheck}
                                defaultChecked={this.state.administrator}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" >Log in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Login
