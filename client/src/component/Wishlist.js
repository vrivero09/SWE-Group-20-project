import React, {Component, useState} from 'react';
import { Button, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import axios from 'axios';
import { useEffect } from 'react';


function WishlistBookEntry(props) {
    const book = props.book;
    const wishlistId = props.wishlistId;
    const setWishlists = props.setWishlists;
    const wishlists = props.wishlists;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const removeBook = (book_id) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.post('wishlist/removebook', {
            book_id: book_id,
            wishlist_id: wishlistId
        }).then(
            res => {
                setWishlists(res.data.wishlists);
            }
        );
    };

    const moveTo = (wishlist_id) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.post('wishlist/movebook', {
            book_id: book._id,
            wishlist_id_from: wishlistId,
            wishlist_id_to: wishlist_id
        }).then(
            res => {
                setWishlists(res.data.wishlists);
            }
        );
    };

    let movetoEntries = [];
    let index = 0;
    wishlists.forEach(_wishlist=>{
        movetoEntries.push(<DropdownItem onClick={()=>moveTo(_wishlist._id)} key={index++}>{_wishlist.name}</DropdownItem>);
    });

    return (
        <div>
            <div className="text-left">
                {book.bookTitle}
            </div>
            <div className="align-items-around wishlist-entry-actions-container d-flex justify-content-around pb-3">
                <button className="btn btn-sm btn-danger" onClick={() => removeBook(book._id) }>Remove</button>
                <button className="btn btn-sm btn-primary">Add to Cart</button>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        Move to
                        </DropdownToggle>
                    <DropdownMenu>
                        {movetoEntries}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}


function Wishlist(props) {
    const wishlist = props.wishlist;
    const setWishlists = props.setWishlists;
    const wishlists = props.wishlists;
    let books = [];
    let index = 0;
    wishlist.books.forEach(book => {
        books.push(<WishlistBookEntry book={book} key={index++} wishlistId={wishlist._id} setWishlists={setWishlists} wishlists={wishlists} />);
    });
    return (
        <div className="wishlist p-2">
            <div className="wishlist-title d-flex justify-content-between align-items-center">
                <div>{ wishlist.name }</div>
                <button className="btn btn-danger">delete</button>
            </div>
            {books}
        </div>
        
    );
}

function Wishlists() {
    const [wishlists, setWishlists] = useState([]);
    const [wishlistName, setWishlistName] = useState("");
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
    useEffect(() => {
        if (wishlists.length === 0) {
            axios.get('wishlist')
            .then(res => {
                setWishlists(res.data.wishlists);
            });
        }
    });
    function addWishlist(setWishlists, wishlistName){
        console.log(`adding wishlist ${wishlistName}`);
        if (wishlistName === '') {
            alert(`Wishlist name can't be empty.`);
            return;
        }
        axios.post('wishlist/add',{
            name: wishlistName
        })
        .then(res=>{
            // res.data.result code
            // 0: success, 1: duplicate name, 2: maximum wishlist count reached
            const resultCode = res.data.result;
            switch (resultCode) {
                case 0: {
                    // success, add to wishlist
                    const _wishlists = res.data.wishlists;
                    setWishlists(_wishlists);
                    break;
                }
                case 1: {
                    // failed, duplicate name
                    alert(`Wishlistname '${wishlistName}' already exists. Try another Name.`);
                    break;
                }
                case 2: {
                    // failed, maximum wishlist count reached
                    const count = res.data.count;
                    alert(`You can make up to ${count} wishlists.`);
                    break;
                }
                default: {
                    alert(`Internal server error.`);
                    break;
                }
            }
            return res.data;
        })
        .catch(err=>{
            console.log(err);
        });
    }
    let elmWishlist = [];
    let index = 0;
    wishlists.forEach(wishlist => {
        elmWishlist.push(<div className="col-4" key={index++}><Wishlist wishlist={wishlist} setWishlists={setWishlists} wishlists={wishlists}/></div>);
    });

      return(
      <div className="container page-container d-flex flex-column">
        <div  className ="example">
            <h1>Wishlist Page</h1>
        </div>
        <div className="d-flex w-100">
            <Input placeholder="wishlist name" className="w-25" value={wishlistName} onChange={(evt) => setWishlistName(evt.target.value)}/>
            <Button onClick={()=>{ addWishlist(setWishlists, wishlistName); }}>Add Wishlist</Button>
        </div>
        <div className="row pt-3 w-100 flex-grow-1 pb-3">
            {elmWishlist}
        </div>
      </div>
   
     );    
  }
  
  export default Wishlists;