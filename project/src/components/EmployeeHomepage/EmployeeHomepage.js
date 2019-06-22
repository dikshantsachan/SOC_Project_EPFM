import React, { Component } from 'react'
import { Container, Image, Button, Dropdown, DropdownButton, Row, ButtonGroup } from 'react-bootstrap'
import TasksPage from './TasksPage.js'

const dispCenter = {
    horizontalAlign: "center"
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

const User = {
    firstName: "FirstName",
    lastName: "LastName"
}

const Manager = {
    firstName: "FirstName",
    lastName: "LastName"
}

const TeamMembers = [
    {firstName: 'Member', lastName: '1'},
    {firstName: 'Member', lastName: '2'}
]

class EmployeeHomepage extends Component {

    render() {
        return (
            <div>
                <Container>
                        <Image src="imp.jpg/171x180" roundedCircle />
                </Container><br />
                <Button variant="primary" size="sm" style={dispCenter}>{formatName(User)}</Button><br /><br />
                <ButtonGroup style={dispCenter} vertical>
                    <Button variant="primary" size="sm" style={dispCenter}>Manager: {formatName(Manager)}</Button>
                    <DropdownButton as={ButtonGroup} title="Team Members" id="bg-vertical-dropdown" size="sm">
                        <Blog TeamMembers={TeamMembers} />
                    </DropdownButton>
                </ButtonGroup><br /><br /><br />
                <TasksPage />
            </div>
        )
    }
}

export default EmployeeHomepage
