import React, { Component } from 'react'
import { Container, Image, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EmployeePage from './EmployeePage.js'
//import logo from './logo.jpg'

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

class EmployeeHomepageRender extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: this.props.email
        }
    }
    
    render() {
        return (
            <EmployeePage email={this.state.email} />
        )
    }
}

function RenderHomepage(props) {
    return <EmployeeHomepageRender email={props.email} />
}

function Blog(props) {
    const content = props.YourTeam.map((member) => formatName(member))
    return (
        <Dropdown.Item>
            {content.map((value, index) => {
                return (
                    <Button key={index} size="sm" onClick={RenderHomepage(value)} >{value}</Button>
                )
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
            yourTeam: [
                { firstName: 'Member', lastName: '1', email: 'email1@email.com' },
                { firstName: 'Member', lastName: '2', email: 'email2@email.com' }
            ]
        }
    }
    
    render() {
        return (
            <div className="App">
                <Container>
                    <Image src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" style={imgsize} roundedCircle />
                </Container><br />
                <Button variant="primary" size="sm" style={dispCenter}>{this.state.userFirstName}&nbsp;{this.state.userLastName}</Button><br /><br />
                <ButtonGroup style={dispCenter} vertical>
                    <DropdownButton as={ButtonGroup} title="Your Team" id="bg-vertical-dropdown" size="sm">
                        <Blog YourTeam={this.state.yourTeam} />
                    </DropdownButton>
                </ButtonGroup><br /><br /><br />
            </div>
        )
    }
}

export default EmployeeHomepage
