import React, {Component } from 'react';
import './Nav.css';
import ShoppingCartIcon from 'react-google-material-icons';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Redirect} from 'react-router-dom'

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
          <NavbarBrand color="#000000" href="/">Geek Text</NavbarBrand>
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
                <NavLink href ="/Ratings">Book Rating</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <NavLink href ="/Cart"><ShoppingCartIcon icon="shopping_cart" size={25} /></NavLink>
              </NavbarText>
            <NavbarText href="" onClick={()=>this.logout()}>Logout</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;