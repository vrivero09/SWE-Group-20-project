import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class  LoginCredentialsForm extends Component {
    constructor(){
        super();
        this.state = {
            username:"",
            password:"",
            disabled:true,
            saved:false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.setState({username:decoded._id});
        }
        
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    onClickEdit(e){
        e.preventDefault();
        this.setState({disabled:false,saved:false});
    }

    onSubmit(e){
        axios.post('http://localhost:5000/users/changePassword',{
            password : this.state.password
        })
        .then(res=>{
            console.log("success");
            this.setState({disabled:true,saved:true});
        })
        .catch(err=>{
            console.log(err);
        });
    }

    onCancel(e){
        e.preventDefault();
        this.form && this.form.reset();
        this.setState({password:"",disabled:true});
    }

    

    render(){
        var button = null;
        //determine to show save or edit button
        if(this.state.disabled){
            button = (
                    <Button className="float-right" size="sm" color="secondary" style={{padding:"5px 15px"}} onClick={this.onClickEdit}>Edit</Button>
            );
        }else{
            button = (
                <div>
                    <Button className="float-right" size="sm" color="secondary" style={{padding:"5px 15px",marginLeft:"5px"}} onClick={this.onCancel}>Cancel</Button>
                    <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}}>Save</Button>
                </div>                
            );
        }

        return(
            
            <div>
                <AvForm onValidSubmit={this.onSubmit} id="loginForm" ref={c => (this.form = c)}> 
                    <div style={{margin:'30px'}} className="text-left">
                        <FormGroup row>
                            <Label sm={2} for="username">Username</Label>
                            <Col sm={4}>
                                <Input disabled type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.onChange} />
                                <FormFeedback> </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="password">Password</Label>
                            <Col sm={4}>
                                <AvField disabled={this.state.disabled} type="password" name="password" id="password" placeholder="Enter new password" required onChange={this.onChange} errorMessage="This field is required"/>
                            </Col>
                        </FormGroup>
                        <FormGroup hidden={this.state.disabled} row>
                            <Label sm={2} for="confirmPassword">Confirm Password</Label>
                            <Col sm={4}>
                                <AvField disabled={this.state.disabled} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={this.onChange} validate={{
                                    required:{value:true, errorMessage:'This field is required!'},
                                    match:{value:'password', errorMessage:'Passwords must match'}
                                }}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={4}>
                                <div style={{color:"#32CD32"}} hidden={!this.state.saved}>Password Changed!</div>
                            </Col>
                            <Col  sm={2}>
                             {button}
                            </Col>
                        </FormGroup>
                    </div> 
                </AvForm>
                
            </div>
        );
    }
    
}

export default LoginCredentialsForm;