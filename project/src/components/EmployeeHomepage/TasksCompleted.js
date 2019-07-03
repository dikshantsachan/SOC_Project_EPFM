import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

function Blog(props) {
    if(!props.CompletedTasks) return <tbody><tr><td colSpan="5">No Tasks Found</td></tr></tbody>
    else {
    return (
        <tbody>
            {props.CompletedTasks.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.Task}</td>
                        <td>{value.TaskDescription}</td>
                        <td>{value.Date}</td>
                        <td>{value.Feedback}</td>
                    </tr>
                )
            })}
        </tbody>
    )
    }
}

class TasksCompleted extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            completedTasks: [
               { id: 1, Task: "Task 1", TaskDescription: "Description 1", Date: "dd/mm/yyyy", Feedback: 10 }
            ]
        }
    }
    

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tasks</th>
                        <th>Task Description</th>
                        <th>Date Completed</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
            <Blog CompletedTasks={this.state.completedTasks} />
            </Table>
        )
    }
}

export default TasksCompleted
