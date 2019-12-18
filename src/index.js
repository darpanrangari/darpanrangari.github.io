import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import MartiansConsumers from './components/MartiansConsumers/MartiansConsumers';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <MartiansConsumers />
    </Provider>, document.getElementById('root'));
