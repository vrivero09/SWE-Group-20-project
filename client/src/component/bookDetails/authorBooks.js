
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Container
  } from 'reactstrap';
  import React, {Component} from 'react';
  import axios from 'axios';
 
  class authorBooks extends Component {
      constructor(props) {
          super(props);
          this.authorName = props.match.params.authorName;
          this.state = {
          books:[]
          }}
      componentDidMount() {
        console.log(this.authorName)
        console.log(this.props.match.params.authorName)
             this.getBooks()
            }
       getBooks(){
        return axios.post('http://localhost:5000/book/authorLink',{
            authorName: this.authorName
        })
        .then(res=>{
           console.log(res);
            this.setState({books:res.data})
           console.log(this.state);
        })
        .catch(err=>{
            console.log(err);
        });
       }     
    render(){
    return (
      <div>
     
      </div>
      );
    }
  }
  
  export default authorBooks;
  
  