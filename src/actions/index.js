import {FETCH_CURRENCIES, FETCH_LATEST_RATE} from './types';
import openexchange from '../api/openexchange';
import config from '../config/config'

const app_id = 'f3cec79a23274d3a985b6d04ea2b9fea'
export const fetchCurrencyAction = (data) => {
    return {
        type: FETCH_CURRENCIES,
        data
    }
};

export const fetchLatestRatesAction = (rates) => {
    return {
        type: FETCH_LATEST_RATE,
        rates
    }
}

export const fetchCurrencies = () => {
    return (dispatch) => {
        return openexchange.get('/currencies.json')
            .then(response => {
                dispatch(fetchCurrencyAction(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchLatestRates = () => {
    return (dispatch) => {
        return openexchange.get(`/latest.json`, {
            params: {
                app_id,
                base: config.baseCurrency,
            }
        })
            .then(response => {
                console.log(response.data, '**************')
                dispatch(fetchLatestRatesAction(response.data))
            })
            .catch(error => {
                throw(error)
            })
    }
}
