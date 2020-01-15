import {EXCHANGE_NOW} from '../actions/types';

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
        case EXCHANGE_NOW:

            const con = state.pockets.map(pocket => {
                /**
                 * Exchanging money between 'To' and 'From' pockets and based apply credit debit logic
                 *
                 * if the 'To' currency does'nt exits in the pockets then
                 * create new pocket and add it to pockets
                 */
                if (pocket.currency === action.data.currencyFrom) {
                    const debit = {
                        currency: pocket.currency,
                        balance: parseFloat(pocket.balance) - parseFloat(action.data.currencyFromValue)
                    };

                    return {...pocket, ...debit}
                } else if (pocket.currency === action.data.currencyTo) {
                    const debit = {
                        currency: pocket.currency,
                        balance: parseFloat(pocket.balance) + parseFloat(action.data.currencyToValue)
                    };

                    return {...pocket, ...debit}
                } else {
                    return pocket
                }
            });
            const isPocketExists = state.pockets.find((pocket) => pocket.currency === action.data.currencyTo);
            if (!isPocketExists) {
                 con.push( {
                    currency: action.data.currencyTo,
                    balance: parseFloat(action.data.currencyToValue)
                })

            }
            return {
                ...state,
                pockets: [...con]
            };
        default:
            return state;
    }
}
