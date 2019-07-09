import React, { Component } from 'react';
import './ChatBox.css';
import NameButtons from './NameButtons'
import Displayer from './Displayer'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'


class ChatBox extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "" ,
      name1:'' ,
      name2:'',
      name:'',
      comment: '',
      date: '',
      nameslist:[],
      commenttry:[],
      iddelete: 0
     
  };
};




getDate = ()=>{
  this.setState({
      date: new Date().toLocaleString()
  })
}







callAPI() {
    fetch("http://localhost:3001/chat")
    .then(responso => {
                return responso.text();
            })
            .then(letslogit => {
              //1console.log(letslogit);
              return letslogit;
            })
            .then(dont => {
              return JSON.parse(dont);
            })
            .then(vara => {
                //2console.log(vara);
               var myobj = vara;
               
                //3console.log(myobj.response.count);

                this.setState({ apiResponse:myobj.response.count});

                
            })
   
        .catch(err => err);
}






componentWillMount() {
    this.getDate();
  
    var userdetails = cookie.load('userId');
    this.setState({name1: userdetails.firstname})

    fetch('http://localhost:3001/teammembers')
      .then(res => res.json())
        .then(team_members => {
          this.setState({nameslist: team_members});
            })
  

}










displayment= () => {
//this.setState({ apiResponse: "sajal"});
this.callAPI();
}













postment = (namei) => {

  var url = "http://localhost:3001/chat";

  this.getDate();

  var data = {
    name1: this.state.name1,
    name2: namei,
    comment: 'Hi',
    date: this.state.date
    }

fetch(url, {
    method: 'POST', // or 'PUT'

    body: JSON.stringify(data),
                                       // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
  }
  })
  
  .then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));

  this.displays(namei);
 
  }



  










  patchment = () => {

    var comme=this.state.comment;

    var url = "http://localhost:3001/chat";

    this.getDate();

    var data = {
      name1: this.state.name1,
      name2: this.state.name2,
      name: this.state.name1,
      comment: comme,
      date: this.state.date
      }
  
  fetch(url, {
      method: 'PATCH', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
   
    this.setState({comment:""})
    this.displays(this.state.name2);
    this.displays(this.state.name2);

    
    }  


    deletement = (idtobedeleted) => {

      var nameofsecond =this.state.name2;

      var url = "http://localhost:3001/chat" + "/" + idtobedeleted + "/" + this.state.name1 + "/" + nameofsecond;

      fetch(url , {
        method: 'delete'
      })
      .then(console.log("deleted successfully"))
      .catch(error => console.error("Error:",error));

      this.displays(nameofsecond);
      this.displays(nameofsecond);
    }







  























  displays = (namepassedfrombutton) => {

    this.setState({name2:namepassedfrombutton});

    var url = "http://localhost:3001/chat/display" ;

    var data = {
      name1: this.state.name1,
      name2: namepassedfrombutton
      }
    
     url = url + "/" + data.name1 + "/" + data.name2 ;

     fetch(url)
    .then(responso => {
                return( responso.text());
            })
        
          .then(dont => {
            return JSON.parse(dont);
          })
          .then(vara => {

            //5console.log(vara);
            var myobj = vara;   
            //6console.log(myobj.docs.comments[1]);

           

           this.setState({
           
             commenttry : myobj.docs.comments
             
           })
          //7console.log(this.state.commenttry);
            
            
            
          })
            .catch (error => {console.error(error);
              this.postment(namepassedfrombutton);
            });
            
  }
  
  

  handlethatcomment=(event)=>{
    this.setState({
        comment:event.target.value
    })
  
  }






  render(){

    var i=0;
   
 
  return (
    <div className='o' >
     
      
     
      <p>;{this.state.apiResponse}</p><br></br>
      <div className='content'>
        
      {this.state.commenttry.map(commi => <Displayer key={commi._id} name={commi.name} comment={commi.comment} date={commi.date} id={commi._id} nameone={this.state.name1} deleteme={this.deletement} />)}
      
      </div>

      
      <div className='sidenav'>
      <header className="header" >
        <h1 className="appheader" >CHAT BOX</h1>
      </header>

      {this.state.nameslist.map((value) => <NameButtons  key={++i} namefirst={this.state.name1} namesecond={value.firstname} patchme={this.patchment} displayme={this.displays} />)} 
      </div>
      <br></br>
      
      <textarea value = {this.state.comment} onChange={this.handlethatcomment} className="font-weight-bold footer"  rows="3" cols="33" >
      </textarea>

      <button className="badge badge-pill senderr" style={{width:'70px',height:'50px'}} onClick={this.patchment} ><span style={{fontSize:"18px"}}>Send</span></button>
      
    </div>
  );
}
}
export default ChatBox;
