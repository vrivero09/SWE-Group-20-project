import { useState, useEffect } from 'react';
import './bookList.css';
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore';
import { MDBInput, MDBCol } from "mdbreact";
import Zoom from "react-medium-image-zoom";
import { Link } from "react-router-dom";
import Form from "../Form";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


import { Container, Row, Col, } from 'reactstrap'


function BookList() {

    // holds a list of books in from out bookTable
    const [books, setBooks] = useState([]);

    const bookCollectionRef = collection(db, 'bookTable');

    useEffect(() => {

        // This returns a promise using async
        const getBooks = async () => {
            const books = await getDocs(bookCollectionRef);
            setBooks(books.docs.map((item) => ({
                ...item.data(), id: item.id
            })));
            console.log(books)
        }

        getBooks()

    }, []);

    return (

        <div>
            <h3><hr />Book List<hr /></h3>
            <div height='1px' className="col d-flex align-content-start flex-wrap" style={{ margin: '35px' }}>

            {books.map((book) => {
                return <div>
                        <div className="flex-wrap align-content-start-xs-2" style={{ margin: '15px' }}>
                            <p style={{ height: "60%" }}>
                                <Link onUpdate={window.scrollTo(0, 0)} to={`/bookDetails/${book.id}`} className="btn btn-link"><img src={book.img} width="200px" alt="image holder" /></Link>
                                <h6>By: {book.author}</h6>
                                <p><b>Price: $ {book.price} </b></p>

                                {/* <p><ButtonAddToWishList productId={product._id} wishlists={this.props.wishlists} setWishlists={this.props.setWishlists} /></p>&nbsp;&nbsp; */}

                                <Link to="/Cart" className="btn btn-sm btn btn-info"
                                ><AddShoppingCartIcon /></Link>


                            </p>
                        
                    </div>
                </div>
            })}
            </div>
        </div>

    );

}

export default BookList;