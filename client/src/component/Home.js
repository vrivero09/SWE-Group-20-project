import React, { Component } from 'react';
// import { Jumbotron, Button } from 'reactstrap'; // doesnt work anymore
import {
  Button, Card, CardImg, CardImgOverlay, CardText, CardTitle,
  Row, Col
} from 'reactstrap'
import styles from './Home.css';
import Books from '../photos/books.jpg'


class Home extends Component {
  render() {
    return (
      <div className={styles.Component} >
        <div className='content'>
          <Card style={{ border: "none" }} className="text-center" inverse>
            {/* <CardImg src={Books} alt="Card image cap" /> */}
            <CardImgOverlay >
              <CardTitle style={{ fontSize: '5rem' }} >Welcome to the Geek Text book store!</CardTitle>
              <CardText className="box" tag="h4">We dedicated our time to deliver a seamless service.
                Every visitor is more than welcome to shop around as guest. Check out our sign up page for more info!</CardText>
              <Button href="/Books" color="primary"> <b>Start shopping! </b></Button>
            </CardImgOverlay>
          </Card>

        </div>
      </div>


    );
  }
}

export default Home;
