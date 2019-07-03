import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'

function Blog(props) {
    if(!props.PendingTasks) return <tbody><tr><td colSpan="5">No Tasks Found</td></tr></tbody>
    else {
    return (
        <tbody>
            {props.PendingTasks.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{value.Task}</td>
                        <td>{value.TaskDescription}</td>
                        <td>{value.date}</td>
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
