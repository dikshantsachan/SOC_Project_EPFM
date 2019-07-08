import React, { Component } from 'react'
import { Container, Table, Image, Button, Dropdown, Modal, DropdownButton, ButtonGroup, Accordion, Card, InputGroup, FormControl, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import EmployeePage from './EmployeePage.js'
import HeaderAfterLogin from '../HeaderAfterLogin.js'
import RemoveTeam from './RemoveTeam.js'
import cookie from 'react-cookies'
import Feedback from './Feedback';
//import logo from './logo.jpg'

const dispCenter = {
    horizontalAlign: "center"
}

const imgsize = {
    width: "180px",
    height: "180px"
}

const formatname = (user) => {
    if(user) {
        return (user.firstname+" "+user.lastname)
    }
    else return "firstname lastname"
}

const formatdate = (date) => {
    if(date) {
        let variable = ""
        for(let i=0; i<10; i++) {
            variable=variable+date[i]
        }
        return variable
    }
    else return "yyyy/mm/dd"
}

function Blog(props) {
    if(!props.PendingTasks) return <tbody><tr><td colSpan="5">No data found</td></tr></tbody>
    else {
        return (
            <tbody>
                {props.PendingTasks.map((value, index) => {
                return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{value.Task}</td>
                            <td>{value.TaskDescription}</td>
                            <td>{formatdate(value.date)}</td>
                            <td>{props.AssignedTo[index]}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        )
    }
}

function Blog2(props) {
    if (!props.CompletedTasks) return <tbody><tr><td colSpan="5">No data found</td></tr></tbody>
    else {
        return (
            <tbody>
                {props.CompletedTasks.map((value, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.Task}</td>
                            <td>{value.TaskDescription}</td>
                            <td>{formatdate(value.date)}</td>
                            <td>{props.AssignedToCompleted[index]}</td>
                            <td><Feedback Task={value} /></td>
                        </tr>
                    )
                }
                )}
            </tbody>
        )
    }
}

class ManagerHomepage extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            show: false,
            error: false,
            email: "",
            userFirstName: "firstname",
            userLastName: "lastname",
            yourTeam: null,
            Task: "",
            TaskDescription: "",
            Deadline: "",
            AssignTo: "Assign Task To",
            pendingTasks: [],
            completedTasks: [],
            AssignedTo: [],
            AssignedToCompleted: []
        }
    }

    componentWillMount(){
        fetch('http://localhost:3001/loginm',        //fetch user data
            {
                method: 'POST',
            })
            .then(res => res.json())
            .then(user => {
                this.setState({memail:user.email});
                this.setState({userFirstName:user.firstname});
                this.setState({userLastName:user.lastname});
                let d = new Date();
                d.setTime(d.getTime() + (60*60*1000))
                var ss = {email:this.state.memail, decider:1};
                cookie.save('userId',ss, { path: '/', expires:d});
                fetch('http://localhost:3001/team',
                {
                    method: 'POST',
                    body: JSON.stringify(user),

                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                )
                .then(res => res.json())
                .then(team => {
                    this.setState({yourTeam:team})
                    for(let i=0; i<team.length; i++) {
                        for(let j=0; j<team[i].tasksPending.length; j++) {
                            var joined = this.state.pendingTasks.concat(team[i].tasksPending[j])
                            var assign = this.state.AssignedTo.concat(formatname(team[i]))
                            this.setState({ pendingTasks: joined })
                            this.setState({ AssignedTo: assign })
                        }
                        for(let k=0; k<team[i].tasksCompleted.length; k++) {
                            var joined = this.state.completedTasks.concat(team[i].tasksCompleted[k])
                            var assign = this.state.AssignedTo.concat(formatname(team[i]))
                            this.setState({ completedTasks: joined })
                            this.setState({ AssignedToCompleted: assign })
                        }
                    }
                })
            }
        )
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

    handleClose = () => {
        this.setState({ show: false })
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value })
    }

    handleAddTeamSubmit = event => {
        fetch('http://localhost:3001/loginm',        //fetch user data
            {
                method: 'POST',
            })
            .then(res => res.json())
            .then(user => {
                var obj = {
                    email: this.state.email,
                    memail: user.email
                }
                fetch('http://localhost:3001/addtoteam',
                    {
                        method: 'POST',
                        body: JSON.stringify(obj),

                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        if (!res.valid) {
                            this.setState({ show: true })
                            this.setState({ error: true })
                        }
                        else {
                            fetch('http://localhost:3001/loginm',        //fetch user data
                                {
                                    method: 'POST',
                                })
                                .then(res => res.json())
                                .then(user => {
                                    fetch('http://localhost:3001/team',
                                        {
                                            method: 'POST',
                                            body: JSON.stringify(user),

                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        }
                                    )
                                        .then(res => res.json())
                                        .then(team => {
                                            this.setState({ yourTeam: team })
                                            for (let i = 0; i < team.length; i++) {
                                                for (let j = 0; j < team[i].tasksPending.length; j++) {
                                                    var joined = this.state.pendingTasks.concat(team[i].tasksPending[j])
                                                    var assign = this.state.AssignedTo.concat(formatname(team[i]))
                                                    this.setState({ pendingTasks: joined })
                                                    this.setState({ AssignedTo: assign })
                                                }
                                            }
                                        })
                                })
                            this.setState({ show: true })
                            this.setState({ error: false })
                        }
                    }
                    )
            })
        event.preventDefault()
    }

    handleSubmit = (event) => {
        //alert(`${this.state.Task} ${this.state.TaskDescription} ${this.state.Deadline} ${this.state.AssignTo}`)
        var task =[
            {
                email:this.state.AssignTo
            }, 
            {
            TaskDescription:this.state.TaskDescription,
            Task:this.state.Task,
            date:this.state.Deadline
            }]
            console.log(task);
            fetch('http://localhost:3001/assigntask',
                {
                    method: 'POST',
                    body: JSON.stringify(task),

                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            .then(err => console.log(err))

    }
    
    render() {
        const { yourTeam } = this.state
        return (
            <Router>
            <div className="App">
                <HeaderAfterLogin
                    drawerClickHandler={this.drawerToggleClickHandler}
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
                                      {value.firstname} {value.lastname}
                                    {/*<Link to={`/user/${value.id}`}>
                                      
                            </Link>*/}
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
                <div className="row">
                    <div style={{ marginLeft: "3%" }}>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {
                                        this.state.error ? (
                                            <h5>Error</h5>
                                        ) : (
                                                <h5>Successfull</h5>
                                            )
                                    }
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                {
                                    this.state.error ? (
                                        <p>Error adding team member</p>
                                    ) : (
                                            <p>You've successfully added to the team</p>
                                        )
                                }
                            </Modal.Body>
                        </Modal>
                        <Form inline onSubmit={this.handleAddTeamSubmit}>
                            <FormControl
                                type="email"
                                placeholder="Email of the Employee"
                                className="mr-sm-2"
                                onChange={this.handleEmailChange}
                                size="sm" />
                            <Button variant="outline-success" type="submit" size="sm">Add to Team</Button>
                        </Form>
                    </div>
                    <div style={{marginLeft: "45%"}}><RemoveTeam yourTeam={this.state.yourTeam}/></div><br /><br />
                </div>
                <div>
                    <Accordion defaultActiveKey="4">                    
                        <Card>
                            <Form onSubmit={this.handleSubmit}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="button" eventKey="0">
                                        Create Task
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <InputGroup size="sm" className="mb-3" style={{ width: "30%" }}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Task Name</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskNameChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" required/>
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Task Description</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskDescriptionChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" required/>
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3" style={{ width: "17%" }}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Deadline</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskDateChange} type="date" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onKeyDown={(event) => event.preventDefault()}
                                             required/>
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3">
                                            <DropdownButton
                                                drop={'up'}
                                                as={InputGroup.Append}
                                                variant="outline-secondary"
                                                title={this.state.AssignTo}
                                                id="input-group-dropdown-2"
                                            >
                                                {yourTeam ? (
                                                    yourTeam.map((value, index) => (
                                                        <Dropdown.Item
                                                            type="submit"
                                                            as={Button}
                                                            key={index}
                                                            size="sm"
                                                            onClick={() => (
                                                                this.setState({ AssignTo: value.email })
                                                            )}
                                                        >
                                                            {value.firstname} {value.lastname}
                                                        </Dropdown.Item>
                                                    )
                                                    )) : (
                                                        <Dropdown.Item>No members to show</Dropdown.Item>
                                                    )
                                                }
                                            </DropdownButton>
                                        </InputGroup>
                                        
                                    </Card.Body>   
                                </Accordion.Collapse>
                            </Form>
                        </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="button" eventKey="1">
                                        Pending Tasks
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tasks</th>
                                                    <th>Task Description</th>
                                                    <th>Deadline (YYYY/MM/DD)</th>
                                                    <th>Assigned to</th>
                                                </tr>
                                            </thead>
                                            <Blog PendingTasks={this.state.pendingTasks} AssignedTo={this.state.AssignedTo} />
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="button" eventKey="2">
                                        Completed Tasks
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tasks</th>
                                                    <th>Task Description</th>
                                                    <th>Date Completed (YYYY/MM/DD)</th>
                                                    <th>Assigned to</th>
                                                    <th>Feedback</th>
                                                </tr>
                                            </thead>
                                            <Blog2 CompletedTasks={this.state.completedTasks} AssignedToCompleted={this.state.AssignedToCompleted} />
                                        </Table>
                                    </Card.Body>
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