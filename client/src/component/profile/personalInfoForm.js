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
            disabled:true,
            saved:false
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
        this.setState({
            info: {                   // object that we want to update
                ...this.state.info,    // keep all other key-value pairs
                [e.target.name]: e.target.value       // update the value of specific key
            }
        });
    }

    //enable inputs
    onClickEdit(e){
        e.preventDefault();
        this.setState({disabled:false,saved:false});
    }

    //save and disable inputs
    onClickSave(e){
        e.preventDefault();

        axios.post('users/changePersonalInfo',{
            firstName : this.state.info.firstName,
            lastName: this.state.info.lastName,
            email:this.state.info.email,
            nickname:this.state.info.nickname
        })
        .then(res=>{
            console.log("success");
            this.setState({disabled:true,saved:true});
            
        })
        .catch(err=>{
            console.log(err);
        });

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
                            <Col sm={4}>
                                <div style={{color:"#32CD32"}} hidden={!this.state.saved}>Info Saved!</div>
                            </Col>
                            <Col  sm={2}>
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