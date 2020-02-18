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
      toLanding:false,
    };
  }

  onToggle(){
    const opposite = !this.state.toggle;
    this.setState({toggle:opposite});
  }

  logout(){
    localStorage.removeItem("userToken");
    this.setState({toLanding:true});
    //this.props.logOut();
  }

  render(){
    if(this.state.toLanding === true){
      console.log("here");
      return <Redirect to='/' />
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