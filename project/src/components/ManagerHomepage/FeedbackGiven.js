import React, { Component } from 'react'
import { Modal, Button, ProgressBar } from 'react-bootstrap'

class FeedbackGiven extends Component {

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
                        Efficiency: <ProgressBar variant="success" now={this.props.task.efficiency * 20} />
                        Speeed: <ProgressBar variant="info" now={this.props.task.speed * 20} />
                        Development: <ProgressBar variant="warning" now={this.props.task.development * 20} />
                        Accountability: <ProgressBar variant="danger" now={this.props.task.development * 20} />
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

export default FeedbackGiven