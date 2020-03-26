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
import BookDetails from './component/bookDetails/bookDetails';
import Cart from './component/shoppingCart/Cart';
import Product from './component/shoppingCart/ProductList';
import Checkout from './component/shoppingCart/checkOut'
import axios from "axios";



class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isAuthenticated : localStorage.getItem("userToken") ? true : false,
      products: [],
      wishlists: []
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getWishlists();
    this.setWishList = this.setWishList.bind(this);
  }

  getWishlists(){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
    return axios.get('wishlist',{
    })
        .then(res=>{
          this.setState({wishlists:res.data.wishlists});
        })
        .catch(err=>{
          console.log(err);
        });
  }

  setWishList(newWishLists) {
    this.setState({wishlists: newWishLists});
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
      <Navigation logOut={this.logOut} isAuth={this.state.isAuthenticated} wishlists={this.state.wishlists}/>
      <Route exact path ='/' render={(props) => <Landing {...props} logIn={this.logIn} />}/>

      <Route path ='/Home' component={Home} />
      
      <Route path ='/bookDetails' render={props => <BookDetails {...props} setWishlists={this.setWishList} wishlists={this.state.wishlists}/>} />

      <div className="container">
        <br/>
        <Route exact path="/Products" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />

      </div>


      <Route path ='/Wishlist' render={props => <Wishlist {...props} setWishlists={this.setWishList} wishlists={this.state.wishlists} />} />
      <Route path ='/Ratings' component={Form} />
      <Route path ='/Profile' component={Profile} />
    </div>
    </BrowserRouter>

  
  );
}
}

export default App;
