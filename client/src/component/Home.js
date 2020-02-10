import React, {Component} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './Home.css';


class Home extends Component {
  render() {
    return(
      <div>
      <Jumbotron>
        <h1 className="display-3"><b>Welcome to the Geek Text book store!</b></h1>

        <p className="lead" style={{color:'black'}}><b>We are dedicated our time to deliver a seamless service.</b></p>
        
        <hr className="my-2" />
        <p style={{color:'black'}}><b>Every visitor is more than welcome to shop around as guest. Check out our sign up page for more info!</b></p>
        <p className="lead">
          <Button href="/Products"color="primary"> <b>Start shopping! </b></Button>
        </p>
      </Jumbotron>
    </div>
 
   );
  } 
}

export default Home;
  