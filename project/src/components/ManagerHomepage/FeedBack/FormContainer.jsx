import React, {Component} from 'react';
import { Button, ButtonToolbar, InputGroup, ButtonGroup, FormControl } from 'react-bootstrap'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
        TaskDescription: this.props.Task.TaskDescription,
        Task: this.props.Task.Task,
        date: this.props.Task.date,
        email: this.props.email,
        efficiency: null,
        speed: null,
        development: null,
        accountability: null,
        feedback: ""
    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleTextArea(e) {
    let value = e.target.value;
    this.setState({
      feedback: value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    let userData = {
        TaskDescription: this.state.TaskDescription,
        Task: this.state.Task,
        date: this.state.date,
        email: this.state.email,
        efficiency: this.state.efficiency,
        speed: this.state.speed,
        development: this.state.development,
        accountability: this.state.accountability,
        feedback: this.state.feedback
    }
    console.log(userData)
    if(this.state.efficiency && this.state.speed && this.state.accountability && this.state.development) {

    fetch('http://localhost:3001/feedback',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({
          efficiency: null,
          development: null,
          speed: null,
          accountability: null,
          feedback: ''
      })
  }

  render() {
    const handleOnClickEfficiency = (rating) => {
      this.setState({ efficiency: rating })
    }
    const handleOnClickDevelopment = (rating) => {
      this.setState({ development: rating })
    }
    const handleOnClickSpeed = (rating) => {
      this.setState({ speed: rating })
    }
    const handleOnClickAccountability = (rating) => {
      this.setState({ accountability: rating })
    }
    return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <label>Employee</label><br />
        <FormControl
          placeholder={this.props.name}
          aria-label="Username"
          aria-describedby="basic-addon1"
          size="sm"
          disabled
        /><br />
        
        <label>Task</label>
        <FormControl
          placeholder={this.props.Task.Task}
          aria-label="Username"
          aria-describedby="basic-addon1"
          size="sm"
          disabled
        /><br />
          
        <label>Give feedback on the basis of this task</label><br />
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="btnGroupAddon">Efficiency</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>&nbsp;&nbsp;&nbsp;
        <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant={this.state.efficiency === 1 ? ("danger") : ("secondary")} onClick={() => handleOnClickEfficiency(1)}>1</Button>
            <Button variant={this.state.efficiency === 2 ? ("danger") : ("secondary")} onClick={() => handleOnClickEfficiency(2)}>2</Button>
            <Button variant={this.state.efficiency === 3 ? ("danger") : ("secondary")} onClick={() => handleOnClickEfficiency(3)}>3</Button>
            <Button variant={this.state.efficiency === 4 ? ("danger") : ("secondary")} onClick={() => handleOnClickEfficiency(4)}>4</Button>
            <Button variant={this.state.efficiency === 5 ? ("danger") : ("secondary")} onClick={() => handleOnClickEfficiency(5)}>5</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="btnGroupAddon">Development</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>&nbsp;&nbsp;&nbsp;
        <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant={this.state.development === 1 ? ("danger") : ("secondary")} onClick={() => handleOnClickDevelopment(1)}>1</Button>
            <Button variant={this.state.development === 2 ? ("danger") : ("secondary")} onClick={() => handleOnClickDevelopment(2)}>2</Button>
            <Button variant={this.state.development === 3 ? ("danger") : ("secondary")} onClick={() => handleOnClickDevelopment(3)}>3</Button>
            <Button variant={this.state.development === 4 ? ("danger") : ("secondary")} onClick={() => handleOnClickDevelopment(4)}>4</Button>
            <Button variant={this.state.development === 5 ? ("danger") : ("secondary")} onClick={() => handleOnClickDevelopment(5)}>5</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="btnGroupAddon">Speed</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>&nbsp;&nbsp;&nbsp;
        <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant={this.state.speed === 1 ? ("danger") : ("secondary")} onClick={() => handleOnClickSpeed(1)}>1</Button>
            <Button variant={this.state.speed === 2 ? ("danger") : ("secondary")} onClick={() => handleOnClickSpeed(2)}>2</Button>
            <Button variant={this.state.speed === 3 ? ("danger") : ("secondary")} onClick={() => handleOnClickSpeed(3)}>3</Button>
            <Button variant={this.state.speed === 4 ? ("danger") : ("secondary")} onClick={() => handleOnClickSpeed(4)}>4</Button>
            <Button variant={this.state.speed === 5 ? ("danger") : ("secondary")} onClick={() => handleOnClickSpeed(5)}>5</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="btnGroupAddon">Accountability</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>&nbsp;&nbsp;&nbsp;
        <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant={this.state.accountability === 1 ? ("danger") : ("secondary")} onClick={() => handleOnClickAccountability(1)}>1</Button>
            <Button variant={this.state.accountability === 2 ? ("danger") : ("secondary")} onClick={() => handleOnClickAccountability(2)}>2</Button>
            <Button variant={this.state.accountability === 3 ? ("danger") : ("secondary")} onClick={() => handleOnClickAccountability(3)}>3</Button>
            <Button variant={this.state.accountability === 4 ? ("danger") : ("secondary")} onClick={() => handleOnClickAccountability(4)}>4</Button>
            <Button variant={this.state.accountability === 5 ? ("danger") : ("secondary")} onClick={() => handleOnClickAccountability(5)}>5</Button>
          </ButtonGroup>
        </ButtonToolbar>

        <div className="form-group">
          <label className="form-label">Feedback</label>
          <textarea
            className="form-control"
            onChange={this.handleTextArea}
            placeholder='Give feedback to the employee in detail if required (optional)'
          />
        </div>

          <Button
              type = "submit"
              variant = "primary"
          >Submit</Button> { /*Submit */ }
          
          <Button
            onClick = {this.handleClearForm}
            variant = "secondary"
          >Clear</Button> {/* Clear the form */}
          
        </form>
  
    );
  }
}

export default FormContainer;