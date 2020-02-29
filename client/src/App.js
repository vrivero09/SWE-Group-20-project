import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Navigation from './component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './component/Home';
import Cart from './component/shoppingCart/Cart';
import Product from './component/shoppingCart/Product';
import Landing from './component/login_registration/landing';
import Form from './component/Form';
import Profile from './component/profile/profile'


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isAuthenticated : localStorage.getItem("userToken") ? true : false
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(){
    console.log("login");
    this.setState({isAuthenticated:true});
  }

  logOut(){
    console.log("logout");
    this.setState({isAuthenticated:false});
  }

  render() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Navigation logOut={this.logOut} isAuth={this.state.isAuthenticated}/>
      <Route exact path ='/' render={(props) => <Landing {...props} logIn={this.logIn} />}/>
      <Route path ='/Home' component={Home} />
      <Route path ='/Cart' component={Cart} />
      <Route path ='/Products' component={Product} />
      <Route path ='/Ratings' component={Form} />
      <Route path ='/Profile' component={Profile} />
      
    </div>
    </BrowserRouter>

  
  );
}
}

export default App;