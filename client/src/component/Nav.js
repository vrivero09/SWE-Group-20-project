import React, {Component } from 'react';
import './Nav.css';
import ShoppingCartIcon from 'react-google-material-icons';
import jwt_decode from 'jwt-decode';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Redirect} from 'react-router-dom'

class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggle:false,
      userFirstName:"No user"
    };  
    this.signedIn = this.props.isAuth; 
    this.toLanding = false;
  }

  componentDidMount(){
    const token = localStorage.getItem("userToken");
    if(token){
        const decoded = jwt_decode(token);
        this.setState({userFirstName:decoded.firstName});
    } 
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
          <NavbarBrand color="#000000" href="/Home">Geek Text</NavbarBrand>
          <NavbarToggler onClick={()=>this.onToggle()} />
          <Collapse isOpen={this.state.toggle} navbar>
            <Nav className="mr-auto" navbar>
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
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.state.userFirstName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/Profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={()=>this.logout()}>
                    logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;