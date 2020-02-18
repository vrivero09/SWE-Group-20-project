import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Navigation from './component/Nav';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Home from './component/Home';
import Cart from './component/Cart';
import Product from './component/Product';
import Landing from './component/login_registration/landing';
import Form from './component/Form';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isAuthenticated : localStorage.getItem("userToken") ? true : false
    }
  }

  logIn(){
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
      {this.state.isAuthenticated ? <Navigation logOut={()=>this.logOut()}/> : <div></div>}
      <Route exact path ='/home' component={Home} />
      <Route path ='/Cart' component={Cart} />
      <Route path ='/Products' component={Product} />
      <Route exact path ='/' render={(props) => <Landing {...props} logIn={()=>this.logIn()} />}/>
      <Route path ='/Ratings' component={Form} />
      
    </div>
    </BrowserRouter>
  );
}
}
export default App;