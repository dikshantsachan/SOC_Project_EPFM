import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'

function Blog(props) {
    if(!props.PendingTasks) return <tbody><tr><td colspan="5">No Tasks Found</td></tr></tbody>
    else {
    return (
        <tbody>
            {props.PendingTasks.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.Task}</td>
                        <td>{value.TaskDescription}</td>
                        <td>{value.Deadline}</td>
                        <td><Button size="sm">Request Close</Button></td>
                    </tr>
                )}
            )}
        </tbody>
    )}
}

class TasksPending extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            pendingTasks: [
                { id: 1, Task: "Task 1", TaskDescription: "Description 1", Deadline: "dd/mm/yyyy" },
                { id: 2, Task: "Task 2", TaskDescription: "Description 2", Deadline: "dd/mm/yyyy" },
                { id: 3, Task: "Task 3", TaskDescription: "Description 3", Deadline: "dd/mm/yyyy" }
            ]
        }
    }

    

    render() {
        
        
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
                    <Blog PendingTasks={this.state.pendingTasks} />
                </Table>
            </div>
        )
    }
}

export default TasksPending
