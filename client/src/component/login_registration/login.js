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
                //valid state of each field
                username: true,
                password: true,
            },
            errors:{
                //error message for invalid fields
                username: "",
                password: ""
            }
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

     //validate form before submit: all fields must be nonempty, check email format, check match passwords
    validateForm(user,validStatus,errors){
        var validForm = true;
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

        return validForm;
    }

    onSubmit(e){
        e.preventDefault();

        //user object with input from user
        const user = {
            username : this.state.username,
            password: this.state.password,
        }

        //default valid status for each input
        const validStatus = {
            username: true,
            password: true,
        }

        //errors for each input
        const errors = {
            username : "",
            password: ""
        }

        //check if form is valid before submit, get any invalid inputs and error messages
        let validForm = this.validateForm(user,validStatus,errors);
        if(!validForm){
            this.setState({valid:validStatus, errors: errors});
            return;
        }

        this.login(user).then(res=>{
            //check for errors from the server like no user exists or incorrect password
            if(res.username_error){
                validForm = false;
                validStatus.username = false;
                errors.username = res.username_error;
                this.setState({valid:validStatus, errors: errors});
                return;
            }

            if(res.password_error){
                validForm = false;
                validStatus.password = false;
                errors.password = res.password_error;
                this.setState({valid:validStatus, errors: errors});
                return;
            }

            if(res.token){
                this.props.logIn();
                this.setState({toHome:true});
            }
        });

        console.log(user);
    }

    login(user){
        return axios.post('http://localhost:5000/users/login',{
            username: this.state.username,
            password : this.state.password
        })
        .then(res=>{
            localStorage.setItem('userToken',res.data.token);
            return res.data
        })
        .catch(err=>{
            console.log(err);
        });
    }

    render(){
        if(this.state.toHome === true){
            return <Redirect to='/Home' />
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