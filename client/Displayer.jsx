import React, { Component } from 'react';
import './App.css';

class Displayer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
         
      };
    };
    

    render() { 
        return (          
      
          <div className="w content">
           <div className="r3">
             <div className="float-left font-weight-bold h">
             {this.props.name}
             </div>
              <div className=" h">
                 {this.props.comment}
             </div>
            </div>
          </div>
         
            
         );
    }
}
 
export default Displayer;