import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import CurrencyExchange from './components/CurrencyExchange/CurrencyExchange';

import Pockets from './components/Pockets/Pockets'
import Container from '@material-ui/core/Container';
import store from './store/store.js'



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Container maxWidth="sm">
                <Switch>
                    <Route exact path="/" component={Pockets} />
                    <Route path="/exchange" component={CurrencyExchange} />
                </Switch>
            </Container>
        </Router>
    </Provider>, document.getElementById('root'));
