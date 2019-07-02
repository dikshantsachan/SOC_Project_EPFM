import React, { Component } from 'react'
import { Container, Image, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import TasksPage from './TasksPage.js'
import { Link } from 'react-router-dom'
//import logo from './logo.jpg'
var user1;
const dispCenter = {
    horizontalAlign: "center"
}

const imgsize = {
    width: "180px",
    height: "180px"
}

function formatName(user) {
    return user.firstName + ' ' + user.lastName
}

function Blog(props) {
    const content = props.TeamMembers.map((member) => formatName(member))
    return (
        <Dropdown.Item>
            {content.map((value, index) => {
                return <li key={index} size="sm">{value}</li>
            })}
        </Dropdown.Item>
    )
}

class EmployeeHomepage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userFirstName: "firstname",
            userLastName: "lastname",
            managerFirstName: "firstname",
            managerLastName: "lastname",
            teamMembers: [
                { firstName: 'Member', lastName: '1' },
                { firstName: 'Member', lastName: '2' }
            ]
        }
    }
    
    componentDidMount(){
        
        fetch('http://localhost:3001/login',        //fetch user data
        {
            method: 'POST',
        })
        .then(res => res.json())
        .then(user => {
            user1 = user;
            console.log(user1)
            this.setState({userFirstName:user.firstname});
            this.setState({userLastName:user.lastname});
            fetch('http://localhost:3001/manager', //fetch manager data on /manager end point
                {
                    method: 'POST',
                    body: JSON.stringify(user1),

                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            .then(res => res.json())
            .then(manager => {
                console.log(manager);
                this.setState({managerFirstName:manager.firstname});
                this.setState({managerLastName:manager.lastname});
            })
        })

        
        

    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Image src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" style={imgsize} roundedCircle />
                </Container><br />
                <Button variant="primary" size="sm" style={dispCenter}>{this.state.userFirstName}&nbsp;{this.state.userLastName}</Button><br /><br />
                <ButtonGroup style={dispCenter} vertical>
                    <Button variant="primary" size="sm" style={dispCenter}>Manager: {this.state.managerFirstName}&nbsp;{this.state.managerLastName}</Button>
                    <DropdownButton as={ButtonGroup} title="Team Members" id="bg-vertical-dropdown" size="sm">
                        <Blog TeamMembers={this.state.teamMembers} />
                    </DropdownButton>
                </ButtonGroup><br /><br /><br />
                <TasksPage />
            </div>
        )
    }
}

export default EmployeeHomepage
