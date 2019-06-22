import React, { Component } from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import TasksPending from './TasksPending';
import TasksCompleted from './TasksCompleted';

class TasksPage extends Component {
    render() {
        return (
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tasks Pending</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tasks Completed</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <TasksPending />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <TasksCompleted />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default TasksPage
