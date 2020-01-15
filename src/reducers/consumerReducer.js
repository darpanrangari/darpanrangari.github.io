import {FETCH_CURRENCIES, FETCH_LATEST_RATE} from '../actions/types';
import config from '../config/config'

const initialState = {
    currencies: {},
    rates: {},
    baseCurrency: config.baseCurrency
};

export default function githubReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CURRENCIES:
            return {
                ...state,
                currencies: action.data
            };
        case FETCH_LATEST_RATE:
            return {
                ...state,
                rates: action.rates
            };
        default:
            return state;
    }
}
