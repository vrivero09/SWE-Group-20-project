import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import Landing from './component/login_registration/landing'
//import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

//ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Landing/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
