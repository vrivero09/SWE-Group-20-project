import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import './Nav';
// import Customers from './component/customers/customers';
import Nav from './Nav';
import Card from './card';


class App extends Component {
  render() {
    return(
      <div className="App">
      <Nav />
      <div  className ="example">
      {/* <Customers /> */}
      <Card />
      </div>   
    </div>
   );
  }
}

export default App;
