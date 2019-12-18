import {FETCH_CONSUMER_DATA, SET_CURRTENT_CONSUMER, UPDATE_CONSUMER} from './types';
import axios from 'axios';

const apiUrl = 'http://www.mocky.io/v2/5df7f38e320000f0612e02df';

export const fetchData = (data) => {
    return {
        type: FETCH_CONSUMER_DATA,
        data
    }
};

export const setCurrentConsumer = (data) => {
    return {
        type: SET_CURRTENT_CONSUMER,
        data
    }
};

export const updateConsumer = (data) => {
    return {
        type: UPDATE_CONSUMER,
        data
    }
};

export const fetchConsumerData = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                dispatch(fetchData(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};
