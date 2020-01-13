import {FETCH_CURRENCIES} from '../actions/types';

const initialState = {
    pockets: [
        {
            currency: 'GBP',
            balance: 50
        },
        {
            currency: 'USD',
            balance: 100
        },
        {
            currency: 'EUR',
            balance: 20
        }],
};

export default function pockets(state = initialState, action) {
    switch (action.type) {
        case FETCH_CURRENCIES:
            return {
                ...state,
                consumers: action.data
            };
        default:
            return state;
    }
}
