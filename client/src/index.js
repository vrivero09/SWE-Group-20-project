import React from 'react';
// import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
// root.render(<App tab="/" />);

// During an update, there's no need to pass the container again.
// root.render(<App tab="profile" />);

// import cartReducer from './component/shoppingCart/reducer/cartReducer';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

//const store = createStore(cartReducer);

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
