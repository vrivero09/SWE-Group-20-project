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
            saved:false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.setState({username:decoded._id});
        }
        
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value,saved:false});
    }

    onSubmit(e){
        e.preventDefault();

        axios.post('users/changePassword',{
            password : this.state.password
        })
        .then(res=>{
            console.log("success");
            this.setState({saved:true});
        })
        .catch(err=>{
            console.log(err);
        });
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
                                <Input type="password" name="password" id="password" placeholder="Enter new password" value={this.state.password} onChange={this.onChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={4}>
                                <div style={{color:"#32CD32"}} hidden={!this.state.saved}>Password Changed!</div>
                            </Col>
                            <Col  sm={2}>
                            <Button className="float-right" onClick={this.onSubmit} size="sm" color="primary" style={{padding:"5px 15px"}}>Save</Button>
                            </Col>
                        </FormGroup>
                       
                    </div>
                    
                </Form>
                
            </div>
        );
    }
    
}

export default LoginCredentialsForm;