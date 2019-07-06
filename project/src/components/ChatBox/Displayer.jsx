import React, { Component } from 'react';
import './ChatBox.css';

class Displayer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
          i : 0,
          colordecider : "r3"
      };
    };
    
    functions = () => {
      this.props.sendmeid(this.props.id);
      console.log(this.state.i);
      var t = this.state.i+1;
      this.setState({
        i :t
      })
     
     if (((this.state.i)%2)===0){
       this.setState({
         colordecider : "r2"
       })
     };

     if (((this.state.i)%2)!==0){
      this.setState({
        colordecider : "r3"
      })
    };

    }

    render() { 
        return (          
     
          <div className="w content" onClick={this.functions}>
           
           <div className={this.state.colordecider}>
             
             <div className="float-left font-weight-bold h">
              
             {this.props.name}
             
             </div>
              <p className="h">
                
                 {this.props.comment} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;       <span className="float-right"> {this.props.date}   </span>                      
                           
             </p>
             
            </div>
            
          </div>
         
            
         );
    }
}
 
export default Displayer;