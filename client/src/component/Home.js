import React, {Component} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import styles from './Home.css';
import { RRNavLink } from 'react-router-dom'


class Home extends Component {
  render() {
    return(
      <div className={styles.Component} >

      <Jumbotron>
        <h1 className="display-3"><b>Welcome to the Geek Text book store!</b></h1>

        <p className="lead" style={{color:'white'}}><b>We are dedicated our time to deliver a seamless service.</b></p>
        
        <hr className="my-2" />
        <p style={{color:'white'}}><b>Every visitor is more than welcome to shop around as guest. Check out our sign up page for more info!</b></p>
        <p className="lead">
          <Button tag = {RRNavLink} exact to="/Books" activeClassName="active"> <b>Start shopping! </b></Button>
        </p>
      </Jumbotron>
    </div>
    
 
   );
  } 
}

export default Home;
  