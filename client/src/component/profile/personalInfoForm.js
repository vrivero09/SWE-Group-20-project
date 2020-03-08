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
            info:{
                firstName:"",
                lastName:"",
                nickname:"",
                email:"",
            },
            disabled:true
        };

        const user_id = "";

        this.onChange = this.onChange.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.user_id = decoded._id;
            this.getInfo();
        }
        
    }

    //get user information and set the state
    getInfo(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.get('users/profile')
        .then(res => {
            if(res.data.user){
                this.setState({info:res.data.user});
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    //enable inputs
    onClickEdit(e){
        e.preventDefault();
        this.setState({disabled:false});
    }

    //save and disable inputs
    onClickSave(e){
        e.preventDefault();
        this.setState({disabled:true});
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
                    <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}} onClick={this.onClickSave}>Save</Button>
            );
        }

        return(
            <div>
                <Form  id="personalForm" > 
                    <div style={{margin:'30px'}} className="text-left">
                        <FormGroup row>
                            <Label sm={2} for="firstName">First Name</Label>
                            <Col sm={4}>
                                <Input  type="text" name="firstName" id="firstName" disabled={this.state.disabled} placeholder="firstName" value={this.state.info.firstName} onChange={this.onChange} />
                                <FormFeedback> </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="lastName">Last Name</Label>
                            <Col sm={4}>
                                <Input  type="text" name="lastName" id="lastName" disabled={this.state.disabled} placeholder="lastName" value={this.state.info.lastName} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="nickname">Nickname</Label>
                            <Col sm={4}>
                                <Input  type="text" name="nickname" id="nickname" disabled={this.state.disabled}  placeholder="nickname" value={this.state.info.nickname} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="email">Email</Label>
                            <Col sm={4}>
                                <Input  type="email" name="email" id="email"  disabled={this.state.disabled} placeholder="email" value={this.state.info.email} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2}></Col>
                            <Col  sm={4}>
                            {button}
                            </Col>
                        </FormGroup>
                    </div>
                    
                </Form>
                
            </div>
        );
    }
    
}

export default PersonalInfoForm;