import React, { useState } from 'react';
import './home.css'
import {
    Card, CardImg, CardImgOverlay, CardText, CardTitle,
    Row,Col,Button
} from 'reactstrap';

const Home = (props) =>{
    return(
        <div>
            <Card style={{border: "none"}} className="text-center" inverse>
                <CardImg width="100%" src="https://video-images.vice.com/articles/5d44c9622980b0000824a7e3/lede/1564789576071-GettyImages-949118068.jpeg?crop=1xw%3A0.8419xh%3B0xw%2C0.1581xh&resize=2000%3A*" alt="Card image cap" />
                <CardImgOverlay className="content">
                    <CardTitle style={{fontSize: '5rem'}} >GeekText</CardTitle>
                    <CardText className="box" tag="h4">Welcome to GeekText where you can browse thousands of books and read them on your free time.</CardText>
                    <Row className="box btns">
                        <Col  sm='6'>
                            <Button color="info" className="w-100" size="md">Sign Up</Button>
                        </Col>
                        <Col  sm='6'>
                            <Button className="w-100" size="md">Log In</Button>
                        </Col>
                    </Row>
                </CardImgOverlay>
            </Card>
        </div>
    );
}

export default Home;