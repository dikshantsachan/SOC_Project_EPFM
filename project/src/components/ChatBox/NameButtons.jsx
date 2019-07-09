import React, { Component } from 'react';
import './ChatBox';

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
          <button className="btn btn-dark m-2" onClick={()=>this.props.displayme(this.props.namesecond)}> <span className="butt"> {this.props.namesecond} </span> </button>      
            
           </a>
           
        </div>
            
        );
    }
}
 
export default NameButtons;