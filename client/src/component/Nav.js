import React, {Component } from 'react';
import './Nav.css';
import MaterialIcon from 'react-google-material-icons';
import jwt_decode from 'jwt-decode';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, Badge,
  NavbarText,UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// import { Navigate} from 'react-router-dom' 
// import { Redirect} from 'react-router-dom' //doesnt work anymore
//import {  BrowserRouter as Link } from 'react-router-dom';
//import { isAuthenticated } from './shoppingCart/repository';

class NavbarComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggle:false,
    };  
    this.signedIn = this.props.isAuth; 
    this.toLanding = false;
    this.user_id = "No user";
  }

  // componentDidMount(){
  //   const token = localStorage.getItem("userToken");
  //   if(token){
  //       const decoded = jwt_decode(token);
  //       this.user_id = decoded._id;
  //   } 
  // }
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
    // let wishlistItemCount = 0;
    // console.log(this.props.wishlists);
    // this.props.wishlists.forEach(wishlist => {
    //   wishlistItemCount += wishlist.books.length;
    // });
    //check if signed in
    // TODO: Set up new sign in 
    // if(this.props.isAuth){
    //   this.signedIn = true;
    //   const token = localStorage.getItem("userToken");
    //   if(token){
    //       const decoded = jwt_decode(token);
    //       console.log(token);
    //       this.user_id = decoded._id;
    //   } 
    // }

    //if signed out
    //  if(!this.signedIn && this.toLanding === true){
    //    this.toLanding = false;
    //    return <Navigate to='/' />
    //  }

     //if logged out and on landing page already, dont show the navigation
    //  if(!this.signedIn){
    //    return null;
    //  }

    return (
      
      <div>
        <Navbar className = "navbar navbar-dark bg-dark"color="dark" light expand="md">
          <NavbarBrand color="#000000" href="/">Geek Text</NavbarBrand>
          <NavbarToggler onClick={()=>this.onToggle()} />
          <Collapse isOpen={this.state.toggle} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href ="/Books"><b>Books</b></NavLink>
              </NavItem>
            </Nav>
            
            <NavbarText className="test">
              <NavLink href ="/Cart"><MaterialIcon icon="shopping_cart" size={25} />
              </NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink href ="/Wishlist"><MaterialIcon icon="assignment" size={25} /><Badge>1</Badge></NavLink>
            </NavbarText>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.user_id}
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

export default NavbarComponent;
