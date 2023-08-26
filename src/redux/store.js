import { createStore, combineReducers } from 'redux';
import loaderReducer from './reducer/loaderReducer';

const rootReducer = combineReducers({
    loader: loaderReducer,
    // ...other reducers
});

const store = createStore(rootReducer);

export default store;