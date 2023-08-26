import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
    loader: loaderReducer,
});

export default rootReducer;