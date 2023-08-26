import { SET_LOADER } from '../action/types';

const initialState = {
    isLoading: false,
};

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default loaderReducer;