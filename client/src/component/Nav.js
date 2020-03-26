import React, {Component } from 'react';
import './Nav.css';
import MaterialIcon from 'react-google-material-icons';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, Badge,
  NavbarText
} from 'reactstrap';
import { Redirect} from 'react-router-dom'
//import {  BrowserRouter as Link } from 'react-router-dom';
//import { isAuthenticated } from './shoppingCart/repository';

class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggle:false,
    };
    this.signedIn = this.props.isAuth; 
    this.toLanding = false;
  }

  onToggle(){
    const opposite = !this.state.toggle;
    this.setState({toggle:opposite});
  }

  logout(){
    localStorage.removeItem("userToken");
    this.toLanding = true;
    this.signedIn = false;
    this.props.logOut();
  }

  render(){
    //const auth = isAuthenticated();
    let wishlistItemCount = 0;
    console.log(this.props.wishlists);
    this.props.wishlists.forEach(wishlist => {
      wishlistItemCount += wishlist.books.length;
    });
    //check if signed in
    if(this.props.isAuth){
      this.signedIn = true;
     }

    //if signed out
     if(!this.signedIn && this.toLanding === true){
       this.toLanding = false;
       return <Redirect to='/' />
     }

     //if logged out and on landing page already, dont show the navigation
     if(!this.signedIn){
       return null;
     }

    return (
      
      <div>
        <Navbar className = "navbar navbar-dark bg-dark"color="dark" light expand="md">
          <NavbarBrand color="#000000" href="/Home">Geek Text</NavbarBrand>
          <NavbarToggler onClick={()=>this.onToggle()} />
          <Collapse isOpen={this.state.toggle} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/Profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href ="/Products">Products</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href ="/bookDetails">bookDetails</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href ="/Ratings">Ratings</NavLink>
              </NavItem>



            </Nav>
            <NavbarText className="test">
              <NavLink href ="/Cart"><MaterialIcon icon="shopping_cart" size={25} /><Badge>0</Badge>
              </NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink href ="/Wishlist"><MaterialIcon icon="assignment" size={25} /><Badge>{wishlistItemCount}</Badge></NavLink>
            </NavbarText>
            <NavbarText href="" onClick={()=>this.logout()}>Logout</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
