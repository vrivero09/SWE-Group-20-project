import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER
} from './types';
//import { USER_SERVER } from '../components/Config.js';

class user_actions extends React.Component {

    componentDidMount() {
        this.getBook()
       }
    
    getBook(){
     return axios.post('book/products',{
         _id:"5e50b8101c9d4400000eed83"
     })
    }
    

}
export default user_actions



export const addToCart = (product) => {
    const request = axios.get(`book/cart/Cart?productId=${_id}`)
    .then(response => response.data);
    return {
        type: 'ADD_TO_CART',
        payload: {
            type: ADD_TO_CART,
            product,
            request,
            quantity: 1
        }
    }
};


// export function addToCart(_id) {
//     const request = axios.get(`book/products/Cart?productId=${_id}`)
//         .then(response => response.data);

//     return {
//         type: ADD_TO_CART,
//         payload: request
//     }
// }



export function getCartItems(cartItems, userCart) {
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {


            //Make CartDetail inside Redux Store 
            // We need to add quantity data to Product Information that come from Product Collection. 

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}




export function removeCartItem(id) {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then(response => {

            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}


export function onSuccessBuy(data) {
    return {
        type: ON_SUCCESS_BUY_USER,
        payload:data
    }
}


// export function registerUser(dataToSubmit) {
//     const request = axios.post(`/register`, dataToSubmit)
//         .then(response => response.data);

//     return {
//         type: REGISTER_USER,
//         payload: request
//     }
// }

// export function loginUser(dataToSubmit) {
//     const request = axios.post(`/login`, dataToSubmit)
//         .then(response => response.data);

//     return {
//         type: LOGIN_USER,
//         payload: request
//     }
// }

// export function auth() {
//     const request = axios.get(`${USER_SERVER}/auth`)
//         .then(response => response.data);

//     return {
//         type: AUTH_USER,
//         payload: request
//     }
// }

// export function logoutUser() {
//     const request = axios.get(`${USER_SERVER}/logout`)
//         .then(response => response.data);

//     return {
//         type: LOGOUT_USER,
//         payload: request
//     }
// }


