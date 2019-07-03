import React, { Component } from 'react'
import { Container, Image, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import TasksPage from './TasksPage.js'
import HeaderAfterLogin from '../HeaderAfterLogin.js'
//import logo from './logo.jpg'
var user1;
const dispCenter = {
    horizontalAlign: "center"
}

const imgsize = {
    width: "180px",
    height: "180px"
}

class EmployeeHomepage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userFirstName: "firstname",
            userLastName: "lastname",
            managerFirstName: "firstname",
            managerLastName: "lastname",
            teamMembers: null
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


            // use this user1 to send data to children TaksPage and handle Tasks Pending and Tasks Completed in it



            this.setState({userFirstName:user.firstname});
            this.setState({userLastName:user.lastname});
            if(user.manager_id){fetch('http://localhost:3001/manager', //fetch manager data on /manager end point
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
                //console.log(manager);
                this.setState({managerFirstName:manager.firstname});
                this.setState({managerLastName:manager.lastname});

                fetch('http://localhost:3001/teammembers')
                .then(res => res.json())
                .then(team_members => {
                this.setState({teamMembers: team_members});
                /* Code */                              //Dikshant handle this array to store values in teamMembers
                })
            })}
            
        })
        
        

    }

    render() {

        const { teamMembers } = this.state
        return (
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
                    <Button variant="primary" size="sm" style={dispCenter}>Manager: {this.state.managerFirstName}&nbsp;{this.state.managerLastName}</Button>
                    <DropdownButton as={ButtonGroup} title="Team Members" id="bg-vertical-dropdown" size="sm">
                        {teamMembers ? (
                            teamMembers.map((value, index) => (
                                <Dropdown.Item key={index} size="sm">
                                        {value.firstname} {value.lastname}
                                </Dropdown.Item>
                            )
                            )) : (
                                <Dropdown.Item>No Members to show</Dropdown.Item>
                            )
                        }
                    </DropdownButton>
                </ButtonGroup><br /><br /><br />
                <TasksPage  />
            </div>
        )
    }
}

export default EmployeeHomepage
