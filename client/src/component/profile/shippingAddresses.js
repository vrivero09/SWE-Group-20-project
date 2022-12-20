import React, {Component} from 'react';
import {
    Button, Card
} from 'reactstrap';
// import jwt_decode from 'jwt-decode';
import axios from 'axios';
import MaterialIcon from 'react-google-material-icons';
// import {AvForm,AvField} from 'availity-reactstrap-validation';

class ShippingAddreses extends Component{
    constructor(){
        super();
        this.state = {
            addresses:[]
        };

        this.updateList = this.updateList.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            this.getInfo();
        }
    }

    //get shipping address list and set state
    getInfo(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.get('http://localhost:5000/users/profile')
        .then(res => {
            if(res.data.user){
                this.setState({addresses:res.data.user.shippingAddress});
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    //update the list when there is a change
    updateList(newList){
        this.setState({addresses:newList});
    }

    //render each shipping address item in the list
    renderItem(){
        if(this.state.addresses.length > 0){
           return( this.state.addresses.map((item, index) => (
                    <div key={item._id} style={{marginBottom:'20px'}}>
                        <ShippingAddrForm disabled style={{paddingBottom:'50px'}} item={item} update={this.updateList} Edit />
                    </div> 
                ))
            );
        }else{
            return <div className="text-left">You have no saved shipping addresses</div>;
        }
    }

    render(){
        return(
            <div>
                <div style={{marginTop:'20px'}}>
                    <ShippingAddrForm Add update={this.updateList} ></ShippingAddrForm> 
                    </div>
                    <h5 className="text-left" style={{marginTop:'20px'}}>Your saved shipping addresses:</h5>
                    <div style={{marginTop:'20px'}}>
                        {this.renderItem()}
                    </div>
            </div>
        );
    }


}


class  ShippingAddrForm extends Component {
    constructor(){
        super();
        this.state = {
            item:{
                _id:"",
                street:"",
                city:"",
                state:"",
                zip:"",
            },
            disabled: false,
            saved: false
            
        };

        this.onChange = this.onChange.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.item){
            this.setState({item:this.props.item, disabled:this.props.disabled});
        }
        
    }

    onChange(e){
        this.setState({
            item: {                   // object that we want to update
                ...this.state.item,    // keep all other key-value pairs
                [e.target.name]: e.target.value       // update the value of specific key
            }
        });

        //remove the saved message
        if(this.props.Add){
            this.setState({saved:false});
        }
    }

    //enable inputs
    onClickEdit(e){
        e.preventDefault();
        this.setState({disabled:false, saved:false});
    }

    onSubmit(e,values){
        if(this.props.Add){
            this.onClickAdd(e,values);
        }else{
            this.onClickSave(e,values);
        }
    }

    //save and disable inputs
    onClickSave(e){
        //e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.post("http://localhost:5000/shippingAddresses/update",{
            street: this.state.item.street,
            state: this.state.item.state,
            city: this.state.item.city,
            zip:this.state.item.zip,
            addr_id:this.state.item._id
        }).then(res=>{
            if(res.data.addresses){
                this.props.update(res.data.addresses);
                this.setState({disabled:true,saved:true});
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    //add address to the list and reset state to blank inputs
    onClickAdd(e,values){
        //e.preventDefault();

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.post("http://localhost:5000/shippingAddresses/add",{
            street: values.street,
            state: values.state,
            city: values.city,
            zip: values.zip,
        }).then(res=>{
            console.log(res);
            if(res.data.addresses){
                this.props.update(res.data.addresses);
                this.setState({ item:{
                    street:"",
                    state:"",
                    city:"",
                    zip:"",
                },saved:true});
                this.form && this.form.reset();
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    //delete addresses
    onClickDelete(e){
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.post("http://localhost:5000/shippingAddresses/remove",{
            addr_id:this.state.item._id
        }).then(res=>{
            if(res.data.addresses){
                this.props.update(res.data.addresses);
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    

    render(){
        //determine to show add, edit, or save button
        var button = null;
        if(this.props.Add){
            button = <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}}>Add</Button>;
        }else if(this.state.disabled){
            button = (
                <div>
                    <Button className="float-right" size="sm" color="danger" onClick={this.onClickDelete}> <MaterialIcon icon="delete_forever" size={18} /></Button>
                    <Button className="float-right mr-2" size="sm" color="secondary" style={{padding:"5px 15px"}} onClick={this.onClickEdit}>Edit</Button>
                </div>
            );
        }else{
            button = (
                <div>
                    <Button className="float-right" size="sm" color="danger" onClick={this.onClickDelete}> <MaterialIcon icon="delete_forever" size={18} /></Button>
                    <Button className="float-right mr-2" size="sm" color="primary" style={{padding:"5px 15px"}} >Save</Button>
                </div>
            );
        }

        return(
            <div>
                <Card style={{width:'600px'}}>
                    {/* <AvForm onValidSubmit={this.onSubmit} ref={c => (this.form = c)}> 
                        <div style={{margin:'30px'}} className="text-left">
                            <FormGroup row>
                                <Label sm={3} for="street">Street</Label>
                                <Col >
                                    <AvField required  type="text" name="street" disabled={this.state.disabled} placeholder="Enter street" value={this.state.item.street||''} onChange={this.onChange} errorMessage='This field is required!' />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="city">City</Label>
                                <Col>
                                    <AvField required  type="text" name="city" disabled={this.state.disabled}  placeholder="Enter city" value={this.state.item.city} onChange={this.onChange} errorMessage="This field is required!"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="state">State</Label>
                                <Col>
                                    <AvField required  type="text" name="state" disabled={this.state.disabled}  placeholder="Enter state" value={this.state.item.state} onChange={this.onChange} errorMessage="This field is required!"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="zip">Zip</Label>
                                <Col>
                                    <AvField  type="text" name="zip" disabled={this.state.disabled} placeholder="Enter zip" value={this.state.item.zip} onChange={this.onChange} validate={{
                                        required:{value:true,errorMessage:'This field is required!'},
                                        pattern:{value:'^[0-9]*$'},
                                        minLength:{value:5, errorMessage:'Enter 5 digits'},
                                        maxLength:{value:5, errorMessage:'Enter 5 digits'}
                                    }}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={8}>
                                    <div style={{color:"#32CD32"}} hidden={!this.state.saved} >Info Saved!</div>
                                </Col>
                                <Col  sm={4}>
                                    {button}
                                </Col>
                            </FormGroup>
                        </div>
                    </AvForm> */}
                </Card>
            </div>
        );
    }
    
}

export default ShippingAddreses;