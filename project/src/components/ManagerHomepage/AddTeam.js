import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

class AddTeam extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
        }
    }

    handleChange = event => {
        this.setState({ name: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()

    }

    render() {
        return (
            <div>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormControl type="email" placeholder="Email of the Employee" className="mr-sm-2" onChange={this.handleChange} />
                    <Button variant="outline-success" type="submit">Request Add to Team</Button>
                </Form>
            </div>
        )
    }
}

export default AddTeam
