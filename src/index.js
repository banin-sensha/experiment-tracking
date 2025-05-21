import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./style/styles.scss";
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <Provider store= { store } >
        <BrowserRouter basename="/experiment-tracking">
            <App />
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'));