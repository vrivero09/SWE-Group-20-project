import React, {Component} from 'react';
import {
    Row, Col, Form, FormGroup, Label, Input,Button,FormFeedback,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

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
            toHome:false,
            valid:{
                //valid state of each field
                firstName: true,
                lastName:true,
                nickname:true,
                email:true,
                username: true,
                password: true,
                confirmPass: true,
            },
            errors:{
                //error message for invalid fields
                firstName: "",
                lastName:"",
                nickname:"",
                email:"",
                username: "",
                password: "",
                confirmPass: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    toggleModal(){
        const opposite = !this.state.toggle;
        this.setState({toggle:opposite});
    }

    //validate user email
    validEmail(email) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            return true;
        } else {
            return false;
        }
    }


    //validate form before submit: all fields must be nonempty, check email format, check match passwords
    validateForm(user,validStatus,errors){
        var validForm = true;
        if(user.firstName === ""){
            validForm = false;
            validStatus.firstName = false;
            errors.firstName = "This field is required";
        }
        if(user.lastName === ""){
            validForm = false;
            validStatus.lastName = false;
            errors.lastName = "This field is required";
        }
        if(user.nickname === ""){
            validForm = false;
            validStatus.nickname = false;
            errors.nickname = "This field is required";
        }
        if(user.email === ""){
            validForm = false;
            validStatus.email = false;
            errors.email = "This field is required";
        }else if(!this.validEmail(user.email)){
            validForm = false;
            validStatus.email = false;
            errors.email = "Incorrect email format";
        }
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
        if(user.confirmPass === ""){
            validForm = false;
            validStatus.confirmPass = false;
            errors.confirmPass = "This field is required";
        }else if(user.confirmPass !== user.password){
            validForm = false;
            validStatus.confirmPass = false;
            errors.confirmPass = "Passwords do not match";
        }

        return validForm;
    }

    onSubmit(e){
        e.preventDefault();

        //new user object with input from user
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nickname: this.state.nickname,
            email: this.state.email,
            username : this.state.username,
            password: this.state.password,
            confirmPass: this.state.confirmPass,
        }

        //default valid status for each input
        const validStatus = {
            firstName: true,
            lastName:true,
            nickname:true,
            email:true,
            username: true,
            password: true,
            confirmPass: true,
        }

        //errors for each input
        const errors = {
            firstName: "",
            lastName:"",
            nickname:"",
            email:"",
            username: "",
            password: "",
            confirmPass: "",
        }

        //check if form is valid before submit, get any invalid inputs and error messages
        let validForm = this.validateForm(newUser,validStatus,errors);
        if(!validForm){
            this.setState({valid:validStatus, errors: errors});
            return;
        }

        this.register(newUser).then(res=>{
            //check for errors from the server like no user exists
            if(res.username_error){
                validForm = false;
                validStatus.username = false;
                errors.username = res.username_error;
                this.setState({valid:validStatus, errors: errors});
                return;
            }
            if(res.token){
                this.props.logIn();
                this.setState({toHome:true});
            }
        });
    }

    register(newUser){
        return axios.post('http://localhost:5000/users/signup',{
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            nickname: newUser.nickname,
            email: newUser.email,
            username : newUser.username,
            password: newUser.password,
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
                <Button className="w-100" color="info" size="md" onClick={()=>this.toggleModal()}>Sign Up</Button>
                <Form id="signForm" onSubmit={this.onSubmit}> 
                    <Modal isOpen={this.state.toggle} toggle={()=>this.toggleModal()}  centered={true} scrollable={true} size="lg">
                        <ModalHeader toggle={()=>this.toggleModal()} cssModule={{'modal-title': 'w-100 text-center'}} >Sign Up</ModalHeader>
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
                                        <Input invalid={!this.state.valid.firstName} type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="First Name" />
                                        <FormFeedback invalid>{this.state.errors.firstName}</FormFeedback>
                                    </Col>
                                    <Col>
                                        <Input  invalid={!this.state.valid.lastName} type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Last Name" />
                                        <FormFeedback invalid>{this.state.errors.lastName}</FormFeedback>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input  invalid={!this.state.valid.nickname} type="text" name="nickname" id="nickname" value={this.state.nickname} onChange={this.onChange} placeholder="Enter nickname"/>
                                <FormFeedback invalid>{this.state.errors.nickname}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input  invalid={!this.state.valid.email}  type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} placeholder="name@example.com" />
                                <FormFeedback invalid>{this.state.errors.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Username">Username</Label>
                                <Input  invalid={!this.state.valid.username} type="text" name="username" id="username" value={this.state.username} onChange={this.onChange} placeholder="Enter username"/>
                                <FormFeedback invalid>{this.state.errors.username}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input  invalid={!this.state.valid.password} type="password" name="password" id="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
                                <FormFeedback invalid>{this.state.errors.password}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPass">Confirm Password</Label>
                                <Input   invalid={!this.state.valid.confirmPass} type="password" name="confirmPass" id="confirmPass" value={this.state.confirmPass} onChange={this.onChange} placeholder="Enter password" />
                                <FormFeedback invalid>{this.state.errors.confirmPass}</FormFeedback>
                            </FormGroup>
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