import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class  LoginCredentialsForm extends Component {
    constructor(){
        super();
        this.state = {
            username:"",
            password:"",
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.setState({user_id:decoded._id});
            //TODO get user data
        }
        
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    

    render(){
        return(
            <div>
                <Form  id="loginForm" > 
                    <div style={{margin:'30px'}} className="text-left">
                        <FormGroup row>
                            <Label sm={2} for="username">Username</Label>
                            <Col sm={4}>
                                <Input disabled type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.onChange} />
                                <FormFeedback> </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="password">Password</Label>
                            <Col sm={4}>
                                <Input  type="password" name="password" id="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2}></Col>
                            <Col  sm={4}>
                            <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}}>Save</Button>
                            </Col>
                        </FormGroup>
                       
                    </div>
                    
                </Form>
                
            </div>
        );
    }
    
}

export default LoginCredentialsForm;