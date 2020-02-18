import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

class  Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            toggle: false,
            toHome:false
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

        const user = {
            username : this.state.username,
            password: this.state.password,
        }

        this.login(user).then(res=>{
            if(res){
                this.props.logIn();
                this.setState({toHome:true});
            }
        });

        console.log(user);
    }

    login(user){
        return axios.post('users/login',{
            username: this.state.username,
            password : this.state.password
        })
        .then(res=>{
            localStorage.setItem('userToken',res.data);
            return res.data
        })
        .catch(err=>{
            console.log(err);
        });
    }

    render(){
        if(this.state.toHome === true){
            return <Redirect to='/home' />
        }
        return(
            <div>
                <Button className="w-100" size="md" onClick={()=>this.onToggle()}>Log In</Button>
                <Form id="loginForm" onSubmit={this.onSubmit}> 
                    <Modal isOpen={this.state.toggle} toggle={()=>this.onToggle()}  centered={true}>
                        <ModalHeader toggle={()=>this.onToggle()} cssModule={{'modal-title': 'w-100 text-center'}} >Login</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
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