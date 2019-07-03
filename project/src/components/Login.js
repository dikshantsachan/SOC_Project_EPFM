import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import './Login.css'
import { Router, Route, Redirect } from 'react-router-dom'
import EmployeeHomepage from './EmployeeHomepage/EmployeeHomepage.js'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isAuth: false,
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

        if(this.state.administrator === false)                          //for employee login
        {
                                                                        //sends a get request to verify email password
        fetch('http://localhost:3001/login'+ '/' +user.email +'/' +user.password)
        .then(res => res.json())
        .then((res) => {
            user.email = res.email
            if(user.email) this.setState({isAuth: true})
            else alert(`Email or Password incorrect`)
        })
        .catch(error => console.error(error));
        
    }
        else{                                                              //manager login "login" +'m'for manager
        fetch('http://localhost:3001/loginm'+ '/' +user.email +'/' +user.password)
        .then(res => res.json())
        .then((res) => {
            user.email = res.email
            if(user.email) this.setState({isAuth: true})
            else alert(`Email or Password incorrect`)
        })
        .catch(error => console.error(error));
        


        }
        event.preventDefault()
    }

    render() {
        if(this.state.isAuth && !this.state.administrator) {
            return (
                <div>
                    <Redirect to="/user" />
                </div>
            )
        }
        else if(this.state.isAuth && this.state.administrator) {
            return (
                <div>
                    <Redirect to="/userm" />
                </div>
            )
        }
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
                            <Button type="submit">Log in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Login
