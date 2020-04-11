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