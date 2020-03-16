import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Navigation from './component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './component/Home';
import Wishlist from './component/Wishlist';
import Landing from './component/login_registration/landing';
import Form from './component/Form';
import Profile from './component/profile/profile';
import bookDetails from './component/bookDetails/bookDetails';
import Cart from './component/shoppingCart/Cart';
import Product from './component/shoppingCart/ProductList';
import Checkout from './component/shoppingCart/checkOut'
//import CartItemList from './component/shoppingCart/CartItemList';
//import Carts from './component/shoppingCart/Carts';
import ProductList from '../src/component/shoppingCart/ProductList'
//import ProductItem from './component/shoppingCart/ProductItem'
import ProductItem from './component/shoppingCart/ProductItem'


class App extends Component{

  

  constructor(props){
    super(props);
    this.state={
      isAuthenticated : localStorage.getItem("userToken") ? true : false,
      products: []
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
    //localStorage.removeItem('x-access-token');
  }

  render() {
   
  return (
    
    <BrowserRouter>
    <div className="App">
      <Navigation logOut={this.logOut} isAuth={this.state.isAuthenticated}/>
      <Route exact path ='/' render={(props) => <Landing {...props} logIn={this.logIn} />}/>

      <Route path ='/Home' component={Home} />
      
      <Route path ='/bookDetails' component={bookDetails} />



      <div className="container">
        <br/>
        <Route exact path="/Products" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />

      </div>


      <Route path ='/Wishlist' component={Wishlist} />
      <Route path ='/Ratings' component={Form} />
      <Route path ='/Profile' component={Profile} />
    </div>
    </BrowserRouter>

  
  );
}
}

export default App;