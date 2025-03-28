import { applyMiddleware } from 'redux';
import {configureStore} from 'reduxjs/toolkit';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';

export const store = configureStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        promise,
        thunk
    )
);