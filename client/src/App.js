import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import './Nav';
// import Customers from './component/customers/customers';
import Nav from './Nav';
import Card from './card';
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from './Cart';


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="App">
         <Nav />
            <Route exact path ="/" component={App} />
            <Route path ="/Cart" component={Cart}/>
          <Card/>
        </div>
    </BrowserRouter>
   );
  }
}

export default App;
