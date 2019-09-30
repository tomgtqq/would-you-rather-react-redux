import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'  
import App from './components/App'
import "./assets/css/index.css"
import "./assets/css/nucleo-icons.css";

const store = createStore(reducer, middleware);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider> ,
document.getElementById('root')
)

