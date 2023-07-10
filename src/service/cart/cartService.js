import fetch from '../../config/interceptor'
import {BaseUrl, APIS} from "../../config/constant/URLS";


export const addToCart = (data) => {
    return fetch({
        method: 'post',
        url: BaseUrl + APIS.CART.add,
        data
    })
}

export const getUserCart = () => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.CART.list
    })
}
