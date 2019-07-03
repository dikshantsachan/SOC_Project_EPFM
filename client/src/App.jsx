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
      date: '',
      nameslist: [{name:"sajal"},{name:"steve"},{name:"bill"},{name:"jin yang"},{name:"erlich"}],
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
    this.getDate();
}










displayment= () => {
//this.setState({ apiResponse: "sajal"});
this.callAPI();
}













postment = (namei) => {

  var url = "http://localhost:8080/chat";

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



  










  patchment = (nameofreceiver,comme) => {

    var url = "http://localhost:8080/chat";

    this.getDate();

    var data = {
      name1: this.state.name1,
      name2: nameofreceiver,
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
   
    this.displays(nameofreceiver);
    this.displays(nameofreceiver);

    
    }  


    deletement = (nameofsecond) => {

      var url = "http://localhost:8080/chat" + "/" + this.state.iddelete + "/" + this.state.name1 + "/" + nameofsecond;

      fetch(url , {
        method: 'delete'
      })
      .then(console.log("deleted successfully"))
      .catch(error => console.error("Error:",error));

      this.displays(nameofsecond);
      this.displays(nameofsecond);
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
    var url = "http://localhost:8080/chat/display" ;

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
  
  

setid = (idtobedeleted) => {

  console.log(idtobedeleted);

  this.setState({
    iddelete : idtobedeleted
  })

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
        <h1 className="appheader" >CHAT BOX</h1>
         </header>

      <button onClick={this.displayment}> SKYGET </button>
      
     
      <p>;{this.state.apiResponse}</p><br></br>
      <div className='content'>
        
      {this.state.commenttry.map(commi => <Displayer key={commi._id} name={commi.name} comment={commi.comment} date={commi.date} id={commi._id} sendmeid={this.setid}/>)}
      
      </div>

      
      <div className='sidenav'>
      {this.state.nameslist.map(names => <NameButtons  key={++i} namefirst={this.state.name1} namesecond={names.name} patchme={this.patchment} displayme={this.displays} deleteme={this.deletement}/>)} 
      </div>
      <br></br>
     
      
    </div>
  );
}
}
export default App;
