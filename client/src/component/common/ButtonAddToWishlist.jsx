import React, { useState } from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import MaterialIcon from "react-google-material-icons";
import axios from "axios";

export default function ButtonAddToWishList(props) {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const toggle = () => {
        setDropDownOpen(!dropDownOpen);
    };
    return (<Dropdown isOpen={dropDownOpen} toggle={toggle}>
        <DropdownToggle caret>
            Add to Wishlist
        </DropdownToggle>
        <DropdownMenu>
            {
                props.wishlists.map((wishlist, index) => {
                    return (
                        <DropdownItem key={index} onClick={() => {
                            axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
                            axios.post('/wishlist/addbook', {
                                book_id: props.productId,
                                wishlist_id: wishlist._id
                            })
                                .then(res => {
                                    props.setWishlists(res.data.wishlists);
                                })
                                .catch(err => { });
                        }}>{wishlist.name}</DropdownItem>
                    );
                })
            }
        </DropdownMenu>
    </Dropdown>);
}
