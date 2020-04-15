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
<<<<<<< HEAD
                <select onChange={props.changeAsc}>
                    <option value="asc">Asc</option>
                    <option value="des">Des</option>
                </select>
=======
>>>>>>> 17669669c32546a07231abc63e4695feda695661
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
<<<<<<< HEAD
                Books per page: &nbsp;
                <select onChange={props.bpp}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div>
=======
>>>>>>> 17669669c32546a07231abc63e4695feda695661
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
<<<<<<< HEAD
            <div>
                Filter By: &nbsp;
                <select id="rating" onChange={props.filterBooks}>
                    <option value="null">-------</option>
                    <option value="top-seller">Top Sellers</option>
                    <option value="Internet">Internet</option>
                    <option value="Web Development">Web Dev</option>
                    <option value="Java">Java</option>
                    <option value="Miscellaneous">Misc</option>
                </select>
            </div>
=======
>>>>>>> 17669669c32546a07231abc63e4695feda695661
        </div>
    );
}

export default SortBar