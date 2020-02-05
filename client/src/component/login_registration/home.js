import React, { useState } from 'react';
import './home.css'
import {
    Card, CardImg, CardImgOverlay, CardText, CardTitle,
    Row,Col,Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Hero from '../../photos/Hero.jpg'

const Login = (props) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <div>
            <Button className="w-100" size="md" onClick={toggle}>Log In</Button>
            <Modal isOpen={modal} toggle={toggle} centered="true">
                    <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    some text here
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Login</Button>
                    <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const Home = (props) =>{
    return(
        <div>
            <Card style={{border: "none"}} className="text-center" inverse>
                <CardImg width="100%" src={Hero} alt="Card image cap" />
                <CardImgOverlay className="content">
                    <CardTitle style={{fontSize: '5rem'}} >GeekText</CardTitle>
                    <CardText className="box" tag="h4">Welcome to GeekText where you can browse thousands of books and read them on your free time.</CardText>
                    <Row className="box btns">
                        <Col  sm='6'>
                            <Button color="info" className="w-100" size="md">Sign Up</Button>
                        </Col>
                        <Col  sm='6'>
                            <Login/>
                        </Col>
                    </Row>
                </CardImgOverlay>
            </Card>
        </div>
    );
}

export default Home;