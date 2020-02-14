import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Nav from './component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './component/Home';
import Cart from './component/shoppingCart/Cart';
// card from './component/shoppingCart/card/card';
import signUpForm from './component/login_registration/signUpForm';
import landing from './component/login_registration/landing';
import LoginForm from './component/login_registration/loginForm';
import Form from './component/Form';
import Product from './component/shoppingCart/Product';
//import productItem from './component/shoppingCart/productItem';



class App extends Component{
  render() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Route exact path ='/' component={Home} />
      <Route exact path ='/Cart' component={Cart} />
      <Route exact path ='/Products' component={Product} />
      <Route exact path ='/SignUp' component={signUpForm} />
      <Route exact path ='/Login' component={LoginForm} />
      <Route exact path ='/Profile' component={landing} />
      <Route exact path ='/Ratings' component={Form} />
      
      
    </div>
    </BrowserRouter>
  );
}
}

let cards =[
  {'name': 'HP 1', 'id': 1},
  {'name': 'HP 2', 'id': 2},
  {'name': 'HP 3', 'id': 3},
  {'name': 'Star wars', 'id': 4},
];

export default App;