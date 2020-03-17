import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
// import { Provider } from 'react-redux';
// import cartReducer from './component/shoppingCart/reducer/cartReducer'
//import * as serviceWorker from './serviceWorker';
// import { createStore } from 'redux';

// const store = createStore(cartReducer);

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
=======
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// import cartReducer from './component/shoppingCart/reducer/cartReducer';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

//const store = createStore(cartReducer);
>>>>>>> shoppingCart

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
