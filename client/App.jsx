import React, { Component } from 'react';
import './App.css';
import NameButtons from './NameButtons'
import Displayer from './Displayer'


class App extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "" ,
      name1: 'erlich',
      name2:'',
      name:'',
      comment: '',
      
      nameslist: [{name:"sajal"},{name:"steve"},{name:"bill"},{name:"jin yang"},{name:"erlich"}],
      commenttry:[]
     
  };
};












callAPI() {
    fetch("http://localhost:8080/chat")
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
    //this.callAPI();
}










displayment= () => {
//this.setState({ apiResponse: "sajal"});
this.callAPI();
}













postment = (namei) => {

  var url = "http://localhost:8080/chat";

  var data = {
    name1: this.state.name1,
    name2: namei,
    comment: 'Hi'
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



  










  patchment = (nameofreceiver,comme) => {

    var url = "http://localhost:8080/chat";
    var data = {
      name1: this.state.name1,
      name2: nameofreceiver,
      name: this.state.name1,
      comment: comme
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
   
    this.displays(nameofreceiver);
    this.displays(nameofreceiver);

    
    }  

  







  handlethatname1 = (event) => {
    this.setState({
      name1: event.target.value
    })
  }






  handlethatname = (event) => {
    this.setState({
      name: event.target.value
    })
  }












  handlethatname2 = (event) => {
    this.setState({
      name2: event.target.value
    })
  }









  handlethatComment = (event) => {
    this.setState({
     comment: event.target.value
    })
  }














  handleSubmit = event => {
    alert(`${this.state.name1} ${this.state.name2} ${this.state.comment}`);
    event.preventDefault();
  } 























  displays = (namepassedfrombutton) => {
    var url = "http://localhost:8080/chat/display" 
    var data = {
      name1: this.state.name1,
      name2: namepassedfrombutton
      }
    
     url = url + "/" + data.name1 + "/" + data.name2 ;

     fetch(url)
    .then(responso => {
                return( responso.text());
            })
          .then(letslogit => {
            //4console.log(letslogit);
            return letslogit;
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
  
  









  /*className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">ChatBox</h1>
     </header>
*/





  render(){

    var i=0;
 
  return (
    <div className='o' >
      <header className="header" >
        <h1 className="appheader">CHAT BOX</h1>
         </header>

      <button onClick={this.displayment}> SKYGET </button>
      
     
      <p>;{this.state.apiResponse}</p><br></br>
      <p className='content'>
      {this.state.commenttry.map(commi => <Displayer key={commi._id} name={commi.name} comment={commi.comment}/>)}
      </p>

      
      <div className='sidenav'>
      {this.state.nameslist.map(names => <NameButtons  key={++i} namefirst={this.state.name1} namesecond={names.name} patchme={this.patchment} displayme={this.displays} />)} 
      </div>
      <br></br>
     
      
    </div>
  );
}
}
export default App;
