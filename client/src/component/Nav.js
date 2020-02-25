import React, { useState } from 'react';
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
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className = "navbar navbar-dark bg-dark"color="dark" light expand="md">
        <NavbarBrand color="#000000" href="/">Geek Text</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
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
          <NavbarText></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;