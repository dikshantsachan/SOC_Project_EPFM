import React, { Component } from 'react'
import { Table, Modal, Button, ProgressBar } from 'react-bootstrap'

const formatdate = (date) => {
    if (date) {
        let variable = ""
        for (let i = 0; i < 10; i++) {
            variable = variable + date[i]
        }
        return variable
    }
    else return "yyyy/mm/dd"
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
                        <td>{formatdate(value.dateCompleted)}</td>
                        <td>
                            {
                                value.speed ? (
                                    <h6><Feedback task={value} /></h6>
                                ) : (
                                    <h6>No feedback yet</h6>
                                )
                            }
                        </td>
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

class Feedback extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            modalShow: false
        }
    }
    
    render() {
        let modalClose = () => this.setState({ modalShow: !this.state.modalShow });
        return (
            <div>
                <Button
                    variant="primary"
                    onClick={() => this.setState({ modalShow: true })}
                    size="sm"
                >
                    View Feedback
                </Button>
                <Modal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Feedback
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Efficiency: <ProgressBar variant="success" now={this.props.task.efficiency*20} />
                        Speeed: <ProgressBar variant="info" now={this.props.task.speed*20} />
                        Development: <ProgressBar variant="warning" now={this.props.task.development*20} />
                        Accountability: <ProgressBar variant="danger" now={this.props.task.development*20} />
                        <label className="form-label">Remarks</label>
                        <textarea
                            className="form-control"
                            placeholder={this.props.task.feedback}
                            disabled
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={modalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default TasksCompleted
