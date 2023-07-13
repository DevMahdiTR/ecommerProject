import fetch from '../../config/interceptor/interceptor'
import {BaseUrl, APIS} from "../../config/constant/URLS";

export const addFav = (data) => {
    return fetch({
        method: 'post',
        url: BaseUrl + APIS.FAVORIES.add,
        data
    })
}

export const getFavList = () => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.FAVORIES.list
    })
}

export const deleteFav = (id) => {
    return fetch({
        method: 'delete',
        url: BaseUrl + APIS.FAVORIES.delete(id)
    })
}