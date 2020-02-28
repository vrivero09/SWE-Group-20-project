import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Nav from './component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './component/Home';
import card from './component/shoppingCart/card/card';
import signUpForm from './component/login_registration/signUpForm';
import landing from './component/login_registration/landing';
import LoginForm from './component/login_registration/loginForm';
import Form from './component/Form';
import Cart from './component/shoppingCart/Cart';


class App extends Component{
  render() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Route exact path ='/' component={Home} />
      <Route exact path ='/Cart' component={Cart} />
      <Route exact path ='/Products' component={card} />
      <Route exact path ='/SignUp' component={signUpForm} />
      <Route exact path ='/Login' component={LoginForm} />
      <Route exact path ='/Profile' component={landing} />
      <Route exact path ='/Ratings' component={Form} />
      
    </div>
    </BrowserRouter>

  
  );
}
}

export default App;