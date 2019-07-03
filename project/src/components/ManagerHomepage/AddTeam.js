import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

class AddTeam extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: ""
        }
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
                    email:this.state.email,
                    memail:user.email
                }
                fetch('http://localhost:3001/addtoteam',
                {
                    method: 'POST',
                    body: JSON.stringify(obj),

                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            .then(res => res.json())
            .then(res => console.log(res))
            .then(err => console.log(err))
            })
        event.preventDefault()

    }

    render() {
        return (
            <div>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormControl type="email" placeholder="Email of the Employee" className="mr-sm-2" onChange={this.handleChange} />
                    <Button variant="outline-success" type="submit">Add to Team</Button>
                </Form>
            </div>
        )
    }
}

export default AddTeam
