import React, { Component } from 'react'
import { Container, Image, Button, Dropdown, DropdownButton, ButtonGroup, Accordion, Card, InputGroup, FormControl, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import EmployeePage from './EmployeePage.js'
import AddTeam from './AddTeam.js'
import HeaderAfterLogin from '../HeaderAfterLogin.js'
//import logo from './logo.jpg'

const dispCenter = {
    horizontalAlign: "center"
}

const imgsize = {
    width: "180px",
    height: "180px"
}

class ManagerHomepage extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            userFirstName: "firstname",
            userLastName: "lastname",
            yourTeam: [
                { id: 1, firstName: 'Member', lastName: '1', email: 'email1@email.com' },
                { id: 2, firstName: 'Member', lastName: '2', email: 'email2@email.com' }
            ],
            Task: "",
            TaskDescription: "",
            Deadline: "",
            AssignTo: ""
        }
    }

    handleTaskNameChange = (event) => {
        this.setState({Task: event.target.value})
    }

    handleTaskDescriptionChange = (event) => {
        this.setState({TaskDescription: event.target.value})
    }

    handleTaskDateChange = (event) => {
        this.setState({Deadline: event.target.value})
    }

    handleSubmit = (event) => {
        alert(`${this.state.Task} ${this.state.TaskDescription} ${this.state.Deadline} ${this.state.AssignTo}`)
    }
    
    render() {
        const { yourTeam } = this.state
        return (
            <Router>
            <div className="App">
                <HeaderAfterLogin
                    drawerClickHandler={this.drawerToggleClickHandler}
                    handleLog={this.handleLog}
                />
                <Container>
                    <Image src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" style={imgsize} roundedCircle />
                </Container><br />
                <Button variant="primary" size="sm" style={dispCenter}>{this.state.userFirstName}&nbsp;{this.state.userLastName}</Button><br /><br />
                <ButtonGroup style={dispCenter} vertical>
                    <DropdownButton as={ButtonGroup} title="Your Team" id="bg-vertical-dropdown" size="sm">
                        {yourTeam ? (
                            yourTeam.map((value, index) => (
                                <Dropdown.Item key={index} size="sm">
                                    <Link to={`/user/${value.id}`}>
                                        {value.firstName} {value.lastName}
                                    </Link>
                                </Dropdown.Item>
                            )
                        )) : (
                            <Dropdown.Item>No members to show</Dropdown.Item>
                        )}
                    </DropdownButton>
                </ButtonGroup><br /><br /><br />
                <Route path="/userm/:employeeId" render={({ match }) => (
                    <EmployeePage employeeId={match.params.employeeId} />
                )} />
                <AddTeam /><br /><br /><br />
                <div>
                    <Accordion defaultActiveKey="1">                    
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="button" eventKey="0">
                                    Create Task
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Form onSubmit={this.handleSubmit}>
                                    <Card.Body>
                                        <InputGroup size="sm" className="mb-3" style={{ width: "30%" }}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Task Name</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskNameChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Task Description</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskDescriptionChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3" style={{ width: "17%" }}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Deadline</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskDateChange} type="date" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3">
                                            <DropdownButton
                                                as={InputGroup.Append}
                                                variant="outline-secondary"
                                                title="Assign Task To"
                                                id="input-group-dropdown-2"
                                            >
                                                {yourTeam ? (
                                                    yourTeam.map((value, index) => (
                                                        <Dropdown.Item key={index} size="sm">
                                                            <Button onClick={() => (this.setState({AssignTo: value.email}))} type="submit">
                                                                {value.firstName} {value.lastName}
                                                            </Button>
                                                        </Dropdown.Item>
                                                    )
                                                    )) : (
                                                        <Dropdown.Item>No members to show</Dropdown.Item>
                                                    )
                                                }
                                            </DropdownButton>
                                        </InputGroup>
                                        <Button type="submit">Submit</Button>
                                    </Card.Body>
                                </Form>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
            </Router>
        )
    }
}

export default ManagerHomepage