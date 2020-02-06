import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import './Nav';
// import Customers from './component/customers/customers';
import Nav from './Nav';
import Card from './card';
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from './Cart';

class Home extends Component {
    render() {
      return(
          <div className="Home">
           <div  className ="title">
                <h1>Home Page</h1>
            </div>
            <Card />
          </div>    
      );
    }
  }
  
  export default Home;
  