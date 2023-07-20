import fetch from '../../config/interceptor/interceptor'
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
export const DeleteFromUserCart = (data) => {
    return fetch({
        method: 'Delete',
        url: BaseUrl + APIS.CART.list,
        data
    })
}
export const UpdateFromUserCart = (data) => {
    return fetch({
        method: 'post',
        url: BaseUrl + APIS.CART.update,
        data
    })
}
