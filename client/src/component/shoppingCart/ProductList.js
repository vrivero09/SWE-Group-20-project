import React from 'react';
import ProductItem from './productITem';
import {getProducts} from './repository';
import { MDBInput, MDBCol } from "mdbreact";

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
        // this.author = props.match.params.author;
        // this.genre = props.match.params.genre;
        // this.price = props.match.params.price;
        // this.bookTitle = props.match.params.bookTitle;
        // this.averageRating = props.match.params.averageRating;

        this.state = {
            products: [],
            search: ''
        }
    }

    componentWillMount() {
        getProducts().then((products) => {
            this.setState({products});
        });
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({search: e.target.value})
    }

    render() {
        const {products, search} = this.state;

        const filteredBooks = products.filter((books) => {
            if(books.bookTitle.toLowerCase().indexOf(search.toLowerCase()) !== -1  ){
                return books;
            }  if (books.author.toLowerCase().indexOf(search.toLowerCase()) !== -1  ){
                return books;
            } if (books.genre.toLowerCase().indexOf(search.toLowerCase()) !== -1  ){
                return books;
            } 
        })

        return (
                    <div>
                        <h3><hr/>Book List<hr/></h3>
                        
                        <MDBCol md="4" alt="Search">
                        <MDBInput 
                            hint="Type author, title, or genre"
                            value={this.state.search}
                            onChange={this.onChange}              
                        />
                        </MDBCol>


                        {/* <SortBar/> */}
                    
                         <div height='1px' className="col d-flex align-content-start flex-wrap" style={{margin: '35px'}}>
                                                {
                            filteredBooks.map((product, index) => <ProductItem value={this.state.search} onChange={this.onChange} wishlists={this.props.wishlists} setWishlists={this.props.setWishlists} product={product} key={index}/>)
                        }

                        </div>
                    </div>



        );
    }
}
