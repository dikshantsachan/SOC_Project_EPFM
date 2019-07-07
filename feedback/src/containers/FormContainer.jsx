import React, {Component} from 'react';  

/* Import Components */
import CheckBox from '../components/CheckBox';  
import Input from '../components/Input';  
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        rating: '',
        employee: '',
        work: [],
        about: ''

      },

      employeeOptions: ['Aakarsh', 'Dikshant', 'Pragyan'],
      workOptions: ['Efficiency', 'Development', 'Speed', 'Accountability']

    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  
  handleRating(e) {
       let value = e.target.value;
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, rating: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
      }), ()=>console.log(this.state.newUser))
  }

  handleCheckBox(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newUser.work.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.work.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.work, newSelection];
    }

      this.setState( prevState => ({ newUser:
        {...prevState.newUser, work: newSelectionArray }
      })
      )
}

  handleFormSubmit(e) {
    
    let userData = this.state.newUser;

    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        newUser: {
          rating: '',
          employee: '',
          work: [],
          about: ''
        },
      })
  }

  render() {
    return (
    
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <Select title={'Employee'}
                  name={'employee'}
                  options = {this.state.employeeOptions} 
                  value = {this.state.newUser.employee}
                  placeholder = {'Select Employee'}
                  handleChange = {this.handleInput}
                  /> 
       

          <Input inputType={'number'} 
                name={'rating'}
                 title= {'Rating'} 
                 value={this.state.newUser.rating} 
                placeholder = {'Rate the employees performance on the scale of 1-5'}
                 handleChange={this.handleRating} />  


          
          <CheckBox  title={'Employee needs to work on'}
                  name={'work'}
                  options={this.state.workOptions}
                  selectedOptions = { this.state.newUser.work}
                  handleChange={this.handleCheckBox}
                   />

          <TextArea
            title={'Feedback'}
            rows={5}
            value={this.state.newUser.about}
            name={'currentPetInfo'}
            handleChange={this.handleTextArea}
            placeholder={'Give the feedback to the employee in detail if required (optional)'} />{/* About you */}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
            style={buttonStyle}
          /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;