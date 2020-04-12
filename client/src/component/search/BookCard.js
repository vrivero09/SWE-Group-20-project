import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(1),
    },
}))


const BookCard = (props) => {
    const {
        openDetails,
        addToCart,
        image,
        title,
        author,
        published,
        bookId,
        price,
        dummyrating
    } = props

    const classes = useStyles()

    
    
    return (
        <div className="card-container">
            <img src={image} alt="" />
            <div className="desc">
                <h2>{title}</h2>
                <h3>{author}</h3>
                <p>{published}</p>
                <p>Price: {price}</p>
                <p>Rating: {dummyrating}</p>
                <Button
                    size="small"
                    className={classes.btn}
                    onClick={openDetails(bookId)}
                    variant="outlined"
                    color="primary"
                >
                    Book Details
                </Button>
                <Button
                    size="small"
                    className={classes.btn}
                    onClick={addToCart([props.title,props.author,props.price])}
                    variant="outlined"
                    color="primary"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default BookCard
