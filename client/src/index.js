import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
import cartReducer from './component/shoppingCart/reducer/cartReducer';

const store = createStore(cartReducer);

//import Landing from './component/login_registration/landing'
//import * as serviceWorker from './serviceWorker';


//ReactDOM.render(<App/>, document.getElementById('root'));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
