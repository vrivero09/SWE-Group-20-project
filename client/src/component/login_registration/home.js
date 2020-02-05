import React, { useState } from 'react';
import './home.css'
import {
    Card, CardImg, CardImgOverlay, CardText, CardTitle,
    Row,Col,Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import SignUpForm from './signUpForm';
import LoginForm from './loginForm'
import Hero from '../../photos/Hero.jpg'

const Login = (props) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <div>
            <Button className="w-100" size="md" onClick={toggle}>Log In</Button>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}} toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <LoginForm/>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-100" color="primary" onClick={toggle}>Login</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const SignUp = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <div>
            <Button className="w-100" color="info" size="md" onClick={toggle}>Sign Up</Button>
            <Modal isOpen={modal} toggle={toggle} centered={true} scrollable={true} size="lg">
                <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}} toggle={toggle}>Sign Up</ModalHeader>
                <ModalBody className="m-3">
                    <p className="text-center">Welcome to GeekText! Please enter the information below and click submit to sign up.</p>
                    <SignUpForm></SignUpForm>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-100" color="info" onClick={toggle}>Submit</Button>
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
                            <SignUp/>
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