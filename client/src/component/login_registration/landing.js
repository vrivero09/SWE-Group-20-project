import React from 'react';
import './landing.css'
import {
    Card, CardImg, CardImgOverlay, CardText, CardTitle,
    Row,Col
} from 'reactstrap';
import SignUp from './signUp';
import Login from './login'
import Hero from '../../photos/Hero.jpg'

const Landing = (props) =>{
    return(
        <div>
            <Card style={{border: "none"}} className="text-center" inverse>
                <CardImg width="100%" src={Hero} alt="Card image cap" />
                <CardImgOverlay className="content">
                    <CardTitle style={{fontSize: '5rem'}} >GeekText</CardTitle>
                    <CardText className="box" tag="h4">Welcome to GeekText where you can browse thousands of books and read them on your free time.</CardText>
                    <Row className="box btns">
                        <Col  sm='6'>
                            <SignUp logIn={props.logIn}/>
                        </Col>
                        <Col  sm='6'>
                            <Login logIn={props.logIn}/>
                        </Col>
                    </Row>
                </CardImgOverlay>
            </Card>
        </div>
    );
}

export default Landing;