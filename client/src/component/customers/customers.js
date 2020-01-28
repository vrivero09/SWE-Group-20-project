import React, {Component} from 'react';
//import logo from './logo.svg';
import './customers.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Customers extends Component {

  constructor(){
    super();
      this.state = {
          customers:[]

      }
  } 

  componentDidMount(){
      fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers: customers}, ()=> console.log('Customers fetched..',
      customers)));
  }

  render() {
    return(
    <div>
        <h2>Family</h2>
        <ul>
            {this.state.customers.map(customer =>
            <li key ={customer.id}>{customer.firstName} {customer.lastName}</li>
            )}
        </ul>
    </div>
  );
}
}

export default Customers;
