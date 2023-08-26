import { SET_LOADER } from './types';

export const setLoader = (isLoading) => {
    return {
        type: SET_LOADER,
        payload: isLoading,
    };
};