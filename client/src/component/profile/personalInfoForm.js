import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class  PersonalInfoForm extends Component {
    constructor(){
        super();
        this.state = {
            firstname:"",
            lastname:"",
            nickname:"",
            email:"",
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
                <Form  id="personalForm" > 
                    <div style={{margin:'30px'}} className="text-left">
                        <FormGroup row>
                            <Label sm={2} for="firstname">First Name</Label>
                            <Col sm={4}>
                                <Input  type="text" name="firstname" id="firstname" placeholder="firstname" value={this.state.firstname} onChange={this.onChange} />
                                <FormFeedback> </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="lastname">Last Name</Label>
                            <Col sm={4}>
                                <Input  type="text" name="lastname" id="lastname" placeholder="lastname" value={this.state.lastname} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="nickname">Nickname</Label>
                            <Col sm={4}>
                                <Input  type="text" name="nickname" id="nickname" placeholder="nickname" value={this.state.nickname} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="email">Email</Label>
                            <Col sm={4}>
                                <Input  type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.onChange}/>
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

export default PersonalInfoForm;