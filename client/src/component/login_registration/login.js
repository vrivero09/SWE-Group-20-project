import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class  Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
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
            username : this.state.username,
            password: this.state.password,
        }

        console.log(User);
    }

    render(){
        return(
            <div>
                <Button className="w-100" size="md" onClick={()=>this.onToggle()}>Log In</Button>
                <Form id="loginForm" onSubmit={this.onSubmit}> 
                    <Modal isOpen={this.state.toggle} toggle={()=>this.onToggle()}  centered={true}>
                        <ModalHeader toggle={()=>this.onToggle()} cssModule={{'modal-title': 'w-100 text-center'}} >Login</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="name@example.com" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Enter password" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button form="loginForm" className="w-100" type="submit" color="primary">Login</Button>
                        </ModalFooter>
                    </Modal>
                </Form>
            </div>
        );
    }
    
}

export default Login;