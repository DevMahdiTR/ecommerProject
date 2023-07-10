import {APIS, BaseUrl} from "../../config/constant/URLS";
import fetch from '../../config/interceptor/interceptor'

export const getCategories = () => {
    return fetch({
        method: "get",
        url: BaseUrl+ APIS.CATEGORIES.getAndAddCategories,
    })
}
export const addCategories = (data) => {
    return fetch({
        method: "post",
        url: BaseUrl+ APIS.CATEGORIES.getAndAddCategories,
        data,
    })
}
export const updateCategories = (data, id) => {
    return fetch({
        method: "patch",
        url: BaseUrl+ APIS.CATEGORIES.updateGetByIdDelete(id),
        data,
    })
}
export const deleteCategories = (data, id) => {
    return fetch({
        method: "post",
        url: BaseUrl+ APIS.CATEGORIES.updateGetByIdDelete(id),
        data,
    })
}
export const getCategoriesByID = (data, id) => {
    return fetch({
        method: "get",
        url: BaseUrl+ APIS.CATEGORIES.updateGetByIdDelete(id),
        data,
    })
}

