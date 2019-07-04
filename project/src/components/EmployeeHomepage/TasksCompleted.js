import React, { Component } from 'react'
import { Table } from 'react-bootstrap'


const formatdate = (date) => {
    if(date){
    let variable = ""
    for (let i = 0; i < 10; i++) {
        variable = variable + date[i]
    }
    return variable}
    else return date
}

function Blog(props) {
    if(!props.CompletedTasks) return <tbody><tr><td colSpan="5">No Tasks Found</td></tr></tbody>
    else {
    return (
        <tbody>
            {props.CompletedTasks.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{value.Task}</td>
                        <td>{value.TaskDescription}</td>
                        <td>{formatdate(value.date)}</td>
                        {/*<td>{value.Feedback}</td>*/}
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
            completedTasks: null
        }
    }
    componentWillMount(){
        fetch('http://localhost:3001/login',{
            method: 'POST'
        })
        .then(res => res.json())
        .then(user => {
            console.log(user);
            this.setState({completedTasks:user.tasksCompleted})
        })
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
