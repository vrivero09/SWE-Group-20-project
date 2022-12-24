import React, { Component } from 'react';
import './App.css';
import './component/Nav';
import Navigation from './component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home';
import Wishlist from './component/Wishlist';
import Landing from './component/login_registration/landing';
import Form from './component/Form';
import Profile from './component/profile/profile';
import Details from './component/bookDetails/bookDetails';
import authorBooks from './component/bookDetails/authorBooks';
import Cart from './component/shoppingCart/Cart';
// import Books from './component/shoppingCart/ProductList';
import Books from './component/bookList/bookList';
import Checkout from './component/shoppingCart/checkOut'
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("userToken") ? true : false,
      products: [],
      wishlists: []
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    // this.getWishlists();
    // this.setWishList = this.setWishList.bind(this);
  }

  // getWishlists(){
  //   axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
  //   return axios.get('http://localhost:5000/wishlist',{
  //   })
  //       .then(res=>{
  //         this.setState({wishlists:res.data.wishlists});
  //       })
  //       .catch(err=>{
  //         console.log(err);
  //       });
  // }

  // setWishList(newWishLists) {
  //   this.setState({wishlists: newWishLists});
  // }

  logIn() {
    console.log("login");
    this.setState({ isAuthenticated: true });
  }

  logOut() {
    console.log("logout");
    this.setState({ isAuthenticated: false });
    //localStorage.removeItem('x-access-token');
  }

  render() {

    return (
      <BrowserRouter>
        <Routes>
          <Route className="App">
            {/* <Route logOut={this.logOut} isAuth={this.state.isAuthenticated} wishlists={this.state.wishlists}/> */}
            {/* <Route exact path ='/' element={(props) => <Landing {...props} logIn={this.logIn} isAuth={this.state.isAuthenticated} />}/> */}
            {/* <Route exact path ='/' element={<Landing />}/> */}

            <Route exact path='/' element={<Home />} />

            <Route path='/Home' element={<Home />} />

            {/* <Route path ='/bookDetails/:bookId' element={props => <Details {...props} setWishlists={this.setWishList} wishlists={this.state.wishlists}/>} /> */}

            <Route className="container">
              {/* <Route exact path="/Books" element={<Books />} /> */}
              <Route exact path="/Books" element={<Books />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/checkout" element={<Checkout />} />

            </Route>


            {/* <Routes path ='/Wishlist' render={props => <Wishlist {...props} setWishlists={this.setWishList} wishlists={this.state.wishlists} />} /> */}
            <Route path='/Ratings' element={<Form />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/bookDetails' element={<Books />} />
            <Route path='/authorBooks/:authorName' element={<authorBooks />} />
          </Route>
        </Routes>
      </BrowserRouter>



    );
  }
}

export default App;
