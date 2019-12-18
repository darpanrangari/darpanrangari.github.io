import { FETCH_CONSUMER_DATA,SET_CURRTENT_CONSUMER,UPDATE_CONSUMER } from '../actions/types';
const initialState = {
    consumers: [],
    currentConsumer:{}
};
export default function githubReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONSUMER_DATA:
            return {
                ...state,
                consumers: action.data
            };
        case SET_CURRTENT_CONSUMER:
            return {
                ...state,
                currentConsumer: action.data
            };
        case UPDATE_CONSUMER:

            const con = state.consumers.map(consumer => {
                return consumer.id === action.data.id ? {...consumer, ...action.data} : consumer ;
            });

            return{
                ...state,
                consumers: [...con]
            };
        default:
            return state;
    }
}
