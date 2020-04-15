<<<<<<< HEAD
import React, { useState, useReducer, useEffect, useContext } from 'react'
import BookCard from './BookCard'
import { useHistory } from 'react-router-dom'
import bookId from './BookCard'
import bookReducer from '../ShoppingCart/bookReducer'


const BookList = (props) => {
    let history = useHistory()


    const handleOpenDetails = id => () => history.push(`/${id}`)
    console.log(props)
  
     const handleAddToCart = (book) => () => {
        localStorage.setItem('books', JSON.stringify(book))
        console.log(book)
    } 


    var bookspp = parseInt(props.books.bookspp);
    var rating = parseInt(props.books.rating);

    if (isNaN(bookspp))
    {
        bookspp = 10;
    }
    if (isNaN(rating))
    {
        rating = 0;
    }

    console.log(rating);
    var sortedBooks = props.books.books;

    var sorttitleasc = function (a, b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sorttitledes = function (a, b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    var sortauthorasc = function (a, b) {
        a = a.authors[0].toLowerCase();
        b = b.authors[0].toLowerCase();
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sortauthordes = function (a, b) {
        a = a.authors[0].toLowerCase();
        b = b.authors[0].toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    var sortdateasc = function (a, b) {
        a = (a.publishedDate + "").substring(0, 10);
        b = (b.publishedDate + "").substring(0, 10);
        if (a == "undefined")
        {
            a = ''
        }
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sortdatedes = function (a, b) {
        a = (a.publishedDate + "").substring(0, 10);
        b = (b.publishedDate + "").substring(0, 10);
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    var sortpricedes = function (a, b) {
        a= a.price;
        b= b.price;
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sortpriceasc = function (a, b) {  
        a= a.price;
        b= b.price;      
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    var sortratingdes = function (a, b) {
        a= a.dummyrating;
        b= b.dummyrating;
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }

    var sortratingasc = function (a, b) {  
        a= a.dummyrating;
        b= b.dummyrating;      
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    if (props.books.sortfields == "title")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sorttitledes);
        } else {
            sortedBooks = sortedBooks.sort(sorttitleasc)
        }
    }
    else if (props.books.sortfields == "author")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sortauthordes);
        } else {
            sortedBooks = sortedBooks.sort(sortauthorasc)
        }
    }
    else if (props.books.sortfields == "published-date")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sortdatedes);
        } else {
            sortedBooks = sortedBooks.sort(sortdateasc)
        }
    }
    else if (props.books.sortfields == "price")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sortpricedes);
        } else {
            sortedBooks = sortedBooks.sort(sortpriceasc)
        }
    }
    else if (props.books.sortfields == "rating")
    {
        if (props.books.order == "des") {
            sortedBooks = sortedBooks.sort(sortratingdes);
        } else {
            sortedBooks = sortedBooks.sort(sortratingasc)
        }
    }

    var counter = 0;

    return (
        <div className="list">
            {
                sortedBooks.map((book, i) => {
                    if (book && counter < bookspp) 
                    {
                        if (book.dummyrating < rating)
                        {
                            return undefined;
                        }

                        var date = book.publishedDate + "";
                        date = date.substring(0, 10);

                        var rat = "⭐";

                        for (let index = 0; index < Math.floor(parseInt(book.dummyrating)) - 1; index++) {
                            rat = rat + "⭐";                            
                        }



                        if (props.books.filterfields != "" && props.books.filterfields != "null")
                        {
                            if (book.categories[0] == props.books.filterfields || book.categories[1] == props.books.filterfields)
                            {
                                counter++;
                                return (
                                    <BookCard
                                        openDetails={handleOpenDetails}
                                        addToCart={handleAddToCart}
                                        key={i}
                                        image={book.thumbnailUrl}
                                        title={book.title}
                                        author={book.authors[0]}
                                        published={book.publishedDate}
                                        bookId={book._id}
                                        price={"$" + book.price}
                                        rating={rat}
                                    />
                                )
                            }
                        } 
                        else
                        {
                            counter++;
                            return (
                                <BookCard
                                    openDetails={handleOpenDetails}
                                    addToCart={handleAddToCart}
                                    key={i}
                                    image={book.thumbnailUrl}
                                    title={book.title}
                                    author={book.authors[0]}
                                    published={book.publishedDate}
                                    bookId={book._id}
                                    price={"$" + book.price}
                                    rating={rat}
                                />
                            )
                        }                   
                    }
                    return undefined
            })}
        </div>
    )
}

export default BookList
=======
// const BookList = props => {
//     let history = useHistory()

//     const handleOpenDetails = id => () => history.push(`/book-details/${id}`)

//     return (
//         <div className="list">
//             {props.books.map((book, i) => {
//                 if (book) {
//                     console.log(book)

//                     return (
//                         <BookCard
//                             openDetails={handleOpenDetails}
//                             key={i}
//                             image={book.volumeInfo.imageLinks.thumbnail}
//                             title={book.volumeInfo.title}
//                             author={book.volumeInfo.authors}
//                             published={book.volumeInfo.publishedDate}
//                             bookId={book.id}
//                         />
//                     )
//                 }
//                 return undefined
//             })}
//         </div>
//     )
// }

// export default BookList
>>>>>>> 17669669c32546a07231abc63e4695feda695661
