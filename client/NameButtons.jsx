import React, { Component } from 'react';
import './App.css';

class NameButtons extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comment:""
          
      };
    }

    handlethatcomment=(event)=>{
        this.setState({
            comment:event.target.value
        })
 
    }
    
    render() { 
        return (
        <div >
            
            <a>
          <span className="abc">Chat With</span> <button className="btn btn-dark m-2" onClick={()=>this.props.displayme(this.props.namesecond)}> <span className="butt"> {this.props.namesecond} </span> </button>      
            <form>
            <div>
            <input className="font-weight-bold" type='text' value = {this.state.comment} onChange={this.handlethatcomment}>
            </input>
            </div>
            </form>
            <button className="badge badge-pill badge-primary senderr" onClick={() => this.props.patchme(this.props.namesecond,this.state.comment)}>Send</button>
           </a>
           
        </div>
            
        );
    }
}
 
export default NameButtons;