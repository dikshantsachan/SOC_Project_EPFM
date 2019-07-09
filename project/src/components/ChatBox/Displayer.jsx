import React, { Component } from 'react';
import './ChatBox.css';
import {Toast, ToastHeader, ToastBody, Row, Col, onClose} from "react-bootstrap"

class Displayer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
      };
    };

      functions = (event) => {
      this.props.deleteme(this.props.id);  
      }


      render() { 
        if((this.props.nameone)===(this.props.name))
        {
          return (            
              <div className="container" style={{padding:'5px'}}>
                <Row>
                  <Col lg={6}>
                  </Col>
                  <Col lg={6}>
                    <Toast onClose={this.functions} style={{padding:'5px',width:'5000px',float:"right"}} >
                      <Toast.Header style={{color:'white',background:'rgba(43, 189, 226, 0.993)'}} closeButton={true}>
                        <strong className="mr-auto h">{this.props.name}</strong>
                          {this.props.date}
                      </Toast.Header>
                      <Toast.Body className="g" > {this.props.comment}
                      </Toast.Body>
                    </Toast>
                  </Col>
                </Row>
              </div>    
           );
          } 
          else
          return (
            <div className="container" style={{padding:'5px'}} >
              <Row>
                <Col lg={1}> 
                </Col>
                <Col lg={11}>
                  <Toast style={{padding:'5px'}} >
                    <Toast.Header style={{background:" rgb(43, 122, 226)",color:"white" }}  closeButton={false}>
                      <strong className="mr-auto h">{this.props.name}</strong>
                      {this.props.date}
                    </Toast.Header >
                    <Toast.Body className="g"> {this.props.comment}
                    </Toast.Body>
                  </Toast>
                </Col>
                </Row>
            </div>
         
          );
      }
  }
   
export default Displayer;