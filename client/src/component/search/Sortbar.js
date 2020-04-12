import React, { Component } from 'react'

function SortBar(props) {
    return(
        <div className='sort-bar'>
            <div>
                Sort By: &nbsp;
                <select id="sort-by" onChange={props.sortBooks}>
                    <option value="null">-------</option>
                    <option value="rating">Rating</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="publisher">Publisher</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <div>
                Rating: &nbsp;
                <select id="rating" onChange={props.sortBooks}>
                    <option value="null">-------</option>
                    <option value="one">⭐+</option>
                    <option value="two">⭐⭐+</option>
                    <option value="three">⭐⭐⭐+</option>
                    <option value="four">⭐⭐⭐⭐+</option>
                    <option value="five">⭐⭐⭐⭐⭐</option>
                </select>
            </div>
            <div>
                Price: &nbsp;
                <select id="price" onChange={props.sortBooks}>
                    <option value="null">-------</option>
                    <option value="5-">Under $5</option>
                    <option value="5-10">$5-$10</option>
                    <option value="10-15">$10-$15</option>
                    <option value="15-20">$15-$20</option>
                    <option value="20+">$20+</option>
                </select>
            </div>
        </div>
    );
}

export default SortBar