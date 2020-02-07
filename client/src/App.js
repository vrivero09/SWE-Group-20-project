import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Nav from './component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './component/Home';
import Cart from './component/Cart';
import Product from './component/Product';


class App extends Component{
  render() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Route exact path ='/' component={Home} />
      <Route exact path ='/Cart' component={Cart} />
      <Route exact path ='/Products' component={Product} />
      
    </div>
    </BrowserRouter>
  );
}
}
export default App;