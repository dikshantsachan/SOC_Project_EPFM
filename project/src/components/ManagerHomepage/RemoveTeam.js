import React, { Component } from 'react'
import { ButtonGroup, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap'

class RemoveTeam extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "Select Member",
            yourTeam: this.props.yourTeam
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleChange = event => {
        this.setState({ email: event.target.value })
    }

    handleSubmit = event => {
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
                fetch('http://localhost:3001/removefromteam',
                    {
                        method: 'POST',
                        body: JSON.stringify(obj),

                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(res => res.json())
                    .then(res => console.log(res))
                    .then(err => console.log(err))
            })
    }

    render() {
        const { yourTeam } = this.state
        return (
            <Form inline onSubmit={this.handleSubmit}>
            <ButtonGroup horizontal="true">
                <DropdownButton as={ButtonGroup} title={this.state.email} id="bg-vertical-dropdown" size="sm">
                    {yourTeam ? (
                        yourTeam.map((value, index) => (
                            <Dropdown.Item key={index} size="sm" onClick={() => (this.setState({email: value.email}))}>
                                {value.firstname} {value.lastname}
                            </Dropdown.Item>
                        )
                        )) : (
                            <Dropdown.Item>No members to show</Dropdown.Item>
                        )}
                </DropdownButton>
                <Button variant="danger" type="submit" size="sm">Remove From Team</Button>
            </ButtonGroup>
            </Form>
        )
    }
}

export default RemoveTeam
