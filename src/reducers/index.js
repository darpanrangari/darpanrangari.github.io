import { combineReducers } from 'redux';
import data from './consumerReducer';
import pockets from './pocketsReducer'

export default combineReducers({
    data,
    pockets
});
