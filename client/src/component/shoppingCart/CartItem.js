import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { addToCart } from './actions/cart-actions';

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.items,
        id: ownProps.id === state.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    };
}

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.location.state,
        }

    }

    handleAddToCart = (id) => {
        this.props.addToCart(id);
    }

    render() {
        const item = this.state.item;
        return (
            <div className="item-details" key={item.id}>
                <div className="item-details-img">
                    <img src={item.img} alt={item.title} />
                </div>
                <div className="item-details-info">
                    <p className="item-details-title">{item.title}</p>
                    <p className="item-details-price"><b>${item.price}</b></p>
                    <p className="item-details-desc">{item.desc}</p>
                    <div className="item-details-add-to-cart">
                        <Link to="/cart" onClick={ () => { this.handleAddToCart(item.id) } }>
                            <button>Add to Bag</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Item));