import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
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
            toHome:false,
            valid:{
                username: true,
                password: true,
            },
            errors:{
                username: "",
                password: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // validateEmail(e) {
    //     const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     const { validate } = this.state
    //       if (emailRex.test(e.target.value)) {
    //         validate.emailState = 'has-success'
    //       } else {
    //         validate.emailState = 'has-danger'
    //       }
    //       this.setState({ validate })
    // }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
        console.log(this.state);
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

        const validStatus = {
            username: true,
            password: true,
        }

        const errors = {
            username : "",
            password: ""
        }

        let validForm = true;

        if(user.username === ""){
            validForm = false;
            validStatus.username = false;
            errors.username = "This field is required";
        }

        if(user.password === ""){
            validForm = false;
            validStatus.password = false;
            errors.password = "This field is required";
        }

        if(!validForm){
            this.setState({valid:validStatus, errors: errors});
            return;
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
            console.log(res);
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
                <Form  id="loginForm" > 
                    <Modal isOpen={this.state.toggle} toggle={()=>this.onToggle()}  centered={true}>
                        <ModalHeader toggle={()=>this.onToggle()} cssModule={{'modal-title': 'w-100 text-center'}} >Login</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input invalid={!this.state.valid.username} type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.onChange} />
                                <FormFeedback invalid>{this.state.errors.username}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input invalid={!this.state.valid.password} type="password" name="password" id="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
                                <FormFeedback invalid>{this.state.errors.password}</FormFeedback>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.onSubmit} form="loginForm" className="w-100" type="submit" color="primary">Login</Button>
                        </ModalFooter>
                    </Modal>
                </Form>
            </div>
        );
    }
    
}

export default Login;