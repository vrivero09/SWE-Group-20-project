import React, {Component} from 'react';
import {
    Row, Col, Form, FormGroup, Label, Input,Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class  SignUp extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            nickname: '',
            email: '',
            username: '',
            password: '',
            confirmPass: '',
            toggle: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    onToggle(){
        const opposite = !this.state.toggle;
        this.setState({toggle:opposite});
    }

    onSubmit(e){
        e.preventDefault();

        const User = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nickname: this.state.nickname,
            email: this.state.email,
            username : this.state.username,
            password: this.state.password,
            confirmPass: this.state.confirmPass,
        }

        console.log(User);
    }

    render(){
        return(
            <div>
                <Button className="w-100" color="info" size="md" onClick={()=>this.onToggle()}>Sign Up</Button>
                <Form id="signForm" onSubmit={this.onSubmit}> 
                    <Modal isOpen={this.state.toggle} toggle={()=>this.onToggle()}  centered={true} scrollable={true} size="lg">
                        <ModalHeader toggle={()=>this.onToggle()} cssModule={{'modal-title': 'w-100 text-center'}} >Sign Up</ModalHeader>
                        <ModalBody className="m-3">
                            <p className="text-center">Welcome to GeekText! Please enter the information below and click submit to sign up.</p>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="firstName">First Name</Label>
                                    </Col>
                                    <Col>
                                        <Label for="lastName">Last Name</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="First Name" />
                                    </Col>
                                    <Col>
                                        <Input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Last Name" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input type="text" name="nickname" id="nickname" value={this.state.nickname} onChange={this.onChange} placeholder="Enter nickname"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} placeholder="name@example.com" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Username">Username</Label>
                                <Input type="text" name="username" id="username" value={this.state.username} onChange={this.onChange} placeholder="Enter username"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPass">Confirm Password</Label>
                                <Input type="password" name="confirmPass" id="confirmPass" value={this.state.confirmPass} onChange={this.onChange} placeholder="Enter password" />
                            </FormGroup>
                                {/* <Button className="w-100" type="submit" color="info">Submit</Button> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button form="signForm" className="w-100" type="submit" color="info">Submit</Button>
                        </ModalFooter>
                    </Modal>
                </Form>
            </div>
        );
    }
    
}

export default SignUp;