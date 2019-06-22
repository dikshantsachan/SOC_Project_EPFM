import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

function Blog(props) {
    return (
        <tbody>
            {props.PendingTasks.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.Task}</td>
                        <td>{value.TaskDescription}</td>
                        <td>{value.Deadline}</td>
                    </tr>
                )}
            )}
        </tbody>
    )
}

const PendingTasks = [
    {id: 1, Task: "Task 1", TaskDescription: "Description 1", Deadline: "dd/mm/yyyy"},
    {id: 2, Task: "Task 2", TaskDescription: "Description 2", Deadline: "dd/mm/yyyy"},
    {id: 3, Task: "Task 3", TaskDescription: "Description 3", Deadline: "dd/mm/yyyy"},
    {id: 4, Task: "Task 4", TaskDescription: "Description 4", Deadline: "dd/mm/yyyy"}

]

class TasksPending extends Component {
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
                        </tr>
                    </thead>
                    <Blog PendingTasks={PendingTasks} />
                </Table>
            </div>
        )
    }
}

export default TasksPending
