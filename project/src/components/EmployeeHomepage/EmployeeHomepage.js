import React, { Component } from 'react'
import { Container, Button, Image, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import TasksPage from './TasksPage.js'
import HeaderAfterLogin from '../HeaderAfterLogin.js'
import cookie from 'react-cookies'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
        
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
        this.fileUploadHandler = this.fileUploadHandler.bind(this)
        this.state = {
            email: String,
            userFirstName: "firstname",
            userLastName: "lastname",
            managerFirstName: "",
            managerLastName: "",
            selectedFile: null,
            teamMembers: null
        }
    }

    fileUploadHandler = () => {

    }

    fileSelectedHandler = event => {
        this.setState({selectedFile: event.target.files[0]})
    }
    
    componentWillMount(){
        
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
            this.setState({email:user.email});


            let d = new Date();
        
            d.setTime(d.getTime() + (60*60*1000));
            //managerid stored to identify the name of manager
            var ss = {email:this.state.email, firstname:this.state.userFirstName,managerid:user.manager_id, decider: 0};
        
            cookie.save('userId',ss, { path: '/', expires:d});

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
                <HeaderAfterLogin />
                    {/*drawerClickHandler={this.drawerToggleClickHandler}*/}
                <Container>
                    <Image src="https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png" style={imgsize} roundedCircle /><br />
                    <input
                        style={{display: 'none'}}
                        type="file"
                        onChange={this.fileSelectedHandler}
                        ref={fileInput => this.fileInput = fileInput}
                    />
                    <Button onClick={this.fileUploadHandler} size="sm" style={{display: 'none'}}>
                        {this.state.selectedFile ? (
                            <a>Change Profile</a>
                        ) : (
                            <a>Upload</a>
                        )}
                    </Button>
                </Container><br />
                <Button variant="primary" size="sm" style={dispCenter}>{this.state.userFirstName}&nbsp;{this.state.userLastName}</Button><br /><br />
                <ButtonGroup style={dispCenter} vertical>
                    <Button variant="primary" size="sm" style={dispCenter}>Manager: {
                        (this.state.managerFirstName && this.state.managerLastName) ? (
                            <h6>{this.state.managerFirstName} {this.state.managerLastName}</h6>
                            ) : (
                            <h6>No Manager</h6>
                        ) 
                    }</Button>
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
                
                 <Link to='/ChatBox'>ChatBox</Link>       
                
            </div>
        )
    }
}

export default EmployeeHomepage
