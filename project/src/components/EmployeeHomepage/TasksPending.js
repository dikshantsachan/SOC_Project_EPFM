import React, { Component } from 'react'
import { Table, Button, Form } from 'react-bootstrap'

const formatdate = (date) => {
    let variable = ""
    for (let i = 0; i < 10; i++) {
        variable = variable + date[i]
    }
    return variable
}

class TasksPending extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            pendingTasks: null
        }
    }

    componentWillMount(){
        fetch('http://localhost:3001/login',{
            method: 'POST'
        })
        .then(res => res.json())
        .then(user => {
            console.log(user);
            this.setState({pendingTasks:user.tasksPending})
        })
    }

    removeTask = (task) => {
        fetch('http://localhost:3001/removeTask',
            {
                method: 'POST',
                body: JSON.stringify(task),

                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        fetch('http://localhost:3001/login', {
            method: 'POST'
        })
            .then(res => res.json())
            .then(user => {
                console.log(user);
                this.setState({ pendingTasks: user.tasksPending })
            })
            .then(err => console.log(err))
    }

    render() {
        let { pendingTasks } = this.state
        
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tasks</th>
                            <th>Task Description</th>
                            <th>Deadline</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        (!pendingTasks) ? (
                            <tbody><tr><td colSpan="5">No Tasks Found</td></tr></tbody>
                        ) : (
                                <tbody>
                                    {pendingTasks.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.Task}</td>
                                                <td>{value.TaskDescription}</td>
                                                <td>{formatdate(value.date)}</td>
                                                <td><Form onSubmit={() => this.removeTask(value)}><Button size="sm" type="submit">Request Close</Button></Form></td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </tbody>
                        )
                    }
                </Table>
            </div>
        )
    }
}

export default TasksPending
