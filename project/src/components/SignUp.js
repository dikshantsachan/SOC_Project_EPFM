import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import './Login.css'
import axios from 'axios'

export class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            administrator: false,
            email: '',
            password: '',
            cpassword: '',
            firstname: '',
            lastname: '',
            sex: 'M',
            count: 1
        }
    }

    handleCheck = () => {
        this.setState({
            administrator: !this.state.administrator
        })
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

    handleCPasswordChange = (event) => {
        this.setState({
            cpassword: event.target.value
        })
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        const password = this.state.password
        const confirmPassword = this.state.cpassword
        if(password !== confirmPassword) {
            alert("Passwords do not match")
        }
        else {
                var user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            };
    
            fetch('http://localhost:3001/signup',
                {
                    method: 'POST',
                    body: JSON.stringify(user),

                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            .catch(error => console.error(error));
        }
        event.preventDefault();
        
    }

    render() {
        return this.state.count && (
            <div className="first">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Form.Check
                                label="Administrator SignUp"
                                onChange={this.handleCheck}
                                defaultChecked={this.state.administrator}
                            />
                        </Col>
                    </Form.Row><br />

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                value={this.state.firstname}
                                onChange={this.handleFirstNameChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                value={this.state.lastname}
                                onChange={this.handleLastNameChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row style={{ width: '50%'}}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={this.state.cpassword}
                                onChange={this.handleCPasswordChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSex" sm={{ span: 2, offset: 5 }}>
                            <Form.Label>Sex</Form.Label>
                            <Form.Control as="select">
                                <option
                                    value="M"
                                    onChange={this.handleSexChange}
                                >M</option>
                                <option
                                    value="F"
                                    onChange={this.handleSexChange}
                                >F</option>
                                <option
                                    value="Non-binary"
                                    onChange={this.handleSexChange}
                                >Non-binary</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        SignUp
                    </Button>
                </Form>
            </div>
        )
    }
}

export default SignUp
